# Architecture Context

## Stack

| Layer          | Technology                             | Role   |
| -------------- | -------------------------------------- | ------ |
| Framework      | .NET 8 Worker Service (IHostedService) | Long-running background process host and Dependency Injection container. |
| Messaging / UI | Discord.Net                            | WebSocket gateway connection, event listening, and ChatOps interface. |
| AI Integration | Microsoft.Extensions.AI                | Vendor-agnostic abstraction layer for LLM consumption and Tool Calling (MCP). |
| Storage/State  | In-Memory Dictionary (MVP)             | Session and chat history management mapped by User ID (to be replaced by Redis). |

## System Boundaries

- `Worker/` — Application bootstrap, `Program.cs`, Dependency Injection registration, and the core `BackgroundService` lifecycle.
- `Gateway/` — Discord.Net event handlers (e.g., `MessageReceived`). Responsible solely for receiving events, basic validation, and offloading work.
- `AI/` — Implementation of `IAssistantService`, prompt construction, history management, and `IChatClient` interactions.
- `Tools/` — Tool Calling/MCP definitions. Methods exposed to the LLM to access local data, documentation, or internal APIs securely.

## Storage Model

- **In-Memory Cache**: Active chat sessions and message history (`List<ChatMessage>`). Strictly mapped by Discord User ID to maintain context window per user.
- **Local File System / Read-Only Sources**: Internal documentation, mock logs, or Markdown specs that the AI can query via Tool Calling to provide grounded answers.

## Auth and Access Model

- **Identity**: Handled natively by Discord. Users are identified strictly by their unique Discord `Author.Id`.
- **Context Isolation**: Chat history and AI context are strictly isolated per user. User A's messages cannot influence or be retrieved by User B's session.
- **Bot Authentication**: The application authenticates with the Discord Gateway using a secure Bot Token provided via Environment Variables.

## Invariants

1. **Non-Blocking Gateway**: Discord event handlers (`HandleMessageAsync`) must never run long-lived AI work synchronously. LLM calls must be offloaded (e.g., via `Task.Run` or dedicated channels) to prevent Gateway timeouts.
2. **Vendor Agnosticism**: AI logic must depend entirely on `Microsoft.Extensions.AI` abstractions (`IChatClient`). Direct usage of specific vendor SDKs (like OpenAI or Anthropic SDKs) is strictly forbidden outside of the DI setup in `Program.cs`.
3. **State Partitioning**: All stateful operations (chat history) must be partitioned by Discord User ID to prevent data leakage between different users interacting with the bot simultaneously.
4. **No Hardcoded Secrets**: API keys, Discord tokens, and database connection strings must only be accessed via `IConfiguration` or Environment Variables.