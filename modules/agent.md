# Agent 模块 / Agent module

中文

Agent 是 ASC 的核心运行时实体，负责：

- 管理对话循环与工具调用；
- 加载并暴露基础工具与动态 MCP 工具；
- 应用权限策略、确认流程与资源限制（如 context window / cost / max turns）；
- 启动并管理 sub-agent（worker）请求。

关键源码位置：`src/agentic_simulink_cli/agent/`（包含 `context_manager.py`, `events.py`, `permissions.py`, `query.py`, `renderers.py` 等）

English

The Agent is ASC's core runtime component. Responsibilities include:

- running the agent loop and routing tool calls;
- exposing base tools and dynamically discovered MCP tools to the model;
- enforcing permission checks, confirmation prompts, and runtime limits (context window, cost, max turns);
- launching sub-agents (workers) for scoped tasks.

See `src/agentic_simulink_cli/agent` for the implementation and helpers.
