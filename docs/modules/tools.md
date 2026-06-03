# Tools 子系统 / Tools subsystem

中文

工具（tools）是 ASC 暴露给模型的可执行能力单元。主要要点：

- `src/agentic_simulink_cli/tools` 提供工具注册、执行入口与权限检查；
- 基础工具集合在 `tools/base`，包含常用操作：读/写文件、编辑、列文件、grep 搜索、运行 shell、todo 操作、MCP 资源读取等；
- 每个工具实现为 `Tool` 的子类，定义 `name`, `description`, `input_schema` 与执行逻辑；
- `tool_definitions` 用于将工具的 JSON Schema 发给 LLM API；
- 工具执行走统一入口 `execute_tool(name, inp)`，内部调用 `_executor.run_tool()` 生命周期实现。

English

Tools are executable capability units exposed to the model. Key points:

- `src/agentic_simulink_cli/tools` manages registration, execution entrypoints and permission checks;
- Base tools live under `tools/base` and include read_file, write_file, edit_file, list_files, grep_search, run_shell, todo operations, and MCP resource helpers;
- Each tool subclasses `Tool`, declaring `name`, `description`, `input_schema` and its `execute` implementation;
- `tool_definitions` converts tools to JSON Schema for the LLM API;
- Calls go through `execute_tool(name, inp)` which runs a consistent lifecycle implemented by `_executor`.
