# 记忆架构 / Memory Architecture

中文（原文）

## 设计目标

ASC 的记忆系统只做一件事：让 Agent 在跨 session 工作时稳定继承项目事实、功能边界和当前推进状态，而不是把历史聊天全文重新塞回模型。

记忆不做成模型可调用工具。Agent 初始化、新 session、恢复 session、idle 边界刷新时由系统侧加载 memory snapshot，并注入动态 system prompt。

## 分布式作用域

ASC 从当前 `cwd` 开始向上查找 `.asc/memory`：

- 最近的 domain memory 是当前 owner/功能域的工作记忆。
- 祖先目录里的 program memory 是共享的项目级背景。
- 兄弟功能域默认不加载，避免 seat owner 进入 window 的上下文。

典型结构示例见源码实现（`src/agentic_simulink_cli/memory.py`）。

## 文件职责

主要文件（在 `.asc/memory/` 下）：

- `program.json` — 项目级元信息与全局约定。
- `domain.json` — owner/功能域画像，描述范围与负责人等。
- `fact_cards.json` — 稳定事实、约束、功能卡片（包括 `kind: "function"` 的功能定义）。
- `working_memory.json` — 当前活动目标、最近变化、open questions 与 next steps。

## 读写策略（要点）

- Agent 初始化/新 session/恢复 session 时加载 snapshot，但不在这些时刻盲写 memory；
- 当空闲超过阈值或用户明确要求“记住”时，写入 `working_memory.json` 或 `fact_cards.json`；
- 稳定结论上升为 fact card；工作进度写入 working memory。

English (summary)

ASC's memory system stores lightweight, project-scoped artifacts to provide stable context across sessions. It deliberately avoids re-injecting whole chat histories into the model. Memory is organized hierarchically by discovery from the current working directory upward and typically includes:

- `program.json` (project-level metadata and global conventions),
- `domain.json` (owner/domain profile and scope),
- `fact_cards.json` (stable facts, constraints, and function definitions),
- `working_memory.json` (current active tasks, recent changes, open questions, next steps).

The runtime loads snapshots into the agent prompt for context. Writes are conservative: working memory is updated during idle flushes or explicit user actions, and stable facts are upserted when conclusions are verified.

See implementation at `src/agentic_simulink_cli/memory.py` for the discovery rules and read/write helpers.
