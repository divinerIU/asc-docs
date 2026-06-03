# CLI 与 Slash Commands / CLI & Slash Commands

中文

ASC 提供两个层次的交互：

- 命令行入口：仅支持 `asc setup`（由 `src/agentic_simulink_cli/main.py` 提供并启动 ASC 会话）；
- 会话内 Slash 命令：以 `/` 开头的快捷命令（实现位于 `src/agentic_simulink_cli/cli/slash_commands/`），会被路由到对应处理器或作为 skill 的快捷启动。

外部模块执行入口（例如 `python -m agentic_simulink_cli`）不再作为受支持入口维护；请统一使用 `asc setup`。

Slash 命令处理逻辑简述：

- `/cmd` 优先加载内置命令处理器（同名模块）；
- 若找不到对应处理器，会尝试将 `/name` 解析为 skill 并执行（需在 skills 中声明为 user-invocable）；
- 未识别的命令会显示友好提示。

English

ASC has two interaction layers:

- CLI entry: only `asc setup` is supported as the external startup path (implemented in `src/agentic_simulink_cli/main.py`);
- In-session slash commands: commands starting with `/` are handled by the slash command subsystem (`src/agentic_simulink_cli/cli/slash_commands/`).

External module execution entrypoints such as `python -m agentic_simulink_cli` are no longer maintained as supported paths; use `asc setup` consistently.

Slash command routing:

- internal handler modules are loaded for known commands;
- unknown slash names fall back to invoking a user-invocable skill if available;
- unknown commands produce a friendly message.
