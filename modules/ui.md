# UI / TUI

中文

ASC 提供基于终端的交互界面（TUI），用于交互式会话、命令补全、会话选择等。实现位于 `src/agentic_simulink_cli/ui/tui_app.py`，采用 `prompt_toolkit` 与 `rich` 渲染丰富的终端输出。

主要能力：

- 输入补全（文件路径、slash 命令、session id）；
- 会话面板与最近会话预览；
- 命令与工具调用的交互式反馈。

English

ASC provides a terminal UI (TUI) for interactive sessions. The implementation (`src/agentic_simulink_cli/ui/tui_app.py`) uses `prompt_toolkit` and `rich` for completions and rich rendering.

Key features:

- input completer for slash commands, files and sessions;
- session list and recent session preview in the UI;
- interactive feedback for commands, tools and skill invocations.
