# 概览 / Overview

中文（简要）

ASC（Agentic Simulink CLI）是一个面向汽车 Simulink / Stateflow 工程的命令行 + Agent 平台。它的主要职责是：

- 将用户意图通过对话与明确命令（slash commands）转化为工程化的操作步骤；
- 提供对外部能力的安全编排（tools、MCP servers、skills）；
- 管理会话、记忆（project/domain/working memory）、以及可复用的技能模板（skills）。

主要入口：`asc setup`（参见 `src/agentic_simulink_cli/main.py`）

快速开始 / Quick start

English (brief)

ASC (Agentic Simulink CLI) is a CLI-driven agent platform focused on automotive Simulink/Stateflow workflows. It:

- Converts user intents into engineering actions via chat + slash commands;
- Orchestrates tooling and MCP (Model Control Plane) integrations securely;
- Manages sessions, project/domain memory, and reusable skill templates.

Primary CLI entry: `asc setup` (see `src/agentic_simulink_cli/main.py`).

Quick start (commands referenced in code):

- Install Simulink Agentic Toolkit from inside an ASC session:

  - inside ASC session: `/plugins install simulink-agentic-toolkit`

- Start interactive ASC session: `asc setup` (opens the TUI/interactive console).
- Unsupported external startup paths such as `python -m agentic_simulink_cli` are intentionally not maintained.
