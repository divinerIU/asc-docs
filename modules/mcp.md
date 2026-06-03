# MCP 集成 / MCP Integration (Lifecycle)

中文（摘要）

ASC 将 MCP 服务器发现为动态工具集合，发现后以 Claude Code 风格的命名导出为工具：`mcp__<server>__<tool>`。

加载流程要点：

- 在会话准备阶段触发 MCP 配置发现与进程启动；
- 对 stdio MCP 服务器进行 JSON-RPC 握手并列出 tools/resources/prompts；
- 将动态工具合并到 agent 的工具 registry 中供模型使用。

常见超时与环境变量：

- `ASC_MCP_INIT_TIMEOUT_MS`, `ASC_MCP_DISCOVERY_TIMEOUT_MS`, `ASC_MCP_TOOL_CALL_TIMEOUT_MS` 等（实现见 `src/agentic_simulink_cli/mcp.py`）。

English (details)

ASC treats MCP servers as dynamic tool providers. After discovery the MCP tools are exposed to the agent in the shape of `{name, description, input_schema}` and are named using the convention:

```
mcp__<serverName>__<toolName>
```

Load path (high level):

- Chat turn starts → Agent.prepare/ensure tooling → discover MCP configs → spawn stdio MCP server processes → initialize JSON-RPC handshake → `tools/list`, `resources/list`, `prompts/list` → register tools as `mcp__server__tool` → merge into agent.tools

Routing at runtime: when the model calls `mcp__server__tool`, the agent routes the call through `McpRegistry` to the appropriate StdioMcpConnection which performs the JSON-RPC `tools/call`.

Time limits and defaults are defined in `mcp.py` (e.g., init/discovery/tool call timeouts). ASC currently focuses on local stdio MCP servers; remote transports are intentionally deferred.
