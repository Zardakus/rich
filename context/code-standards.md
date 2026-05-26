# Code Standards

## General

- Keep classes and modules small and strictly single-purpose (SRP).
- Fix root causes — do not layer workarounds or swallow exceptions silently.
- Do not mix Gateway Event routing (Discord) with Domain logic (AI Processing) in the same class.
- Favor explicit dependencies via Constructor Injection over static accessors or Service Locators.

## C# and .NET 8+

- Implicit Usings and Nullable Reference Types (`<Nullable>enable</Nullable>`) are required throughout the project to avoid `NullReferenceException`.
- Use modern C# features: Primary Constructors for Dependency Injection and `record` types for immutable data (e.g., Tool Calling parameters and Chat Messages).
- Avoid `dynamic` or loosely typed objects. Use explicit strongly-typed interfaces.
- Avoid primitive obsession. Use domain-specific types where applicable.

## Framework (.NET Worker & Discord.Net)

- **Never block the Gateway**: Discord.Net event handlers (like `MessageReceived`) must return quickly. Offload heavy CPU or I/O bound work (like LLM calls) using `_ = Task.Run(...)` or channels.
- **Strict Async/Await**: Use asynchronous programming end-to-end. Never use `.Result` or `.Wait()`, as they cause thread-pool starvation and deadlocks.
- **Dependency Injection Lifecycles**: 
  - `DiscordSocketClient` must be `Singleton`.
  - External API clients (`IChatClient`) and Domain Services should generally be `Transient` or `Scoped` (if using explicit scopes).

## Prompts and Discord Output (Replacing UI/Styling)

- Format AI responses using proper Discord Markdown (e.g., ` ```csharp ` for code blocks, `**` for bold).
- System Prompts must be maintained as structured string templates or separated files, not deeply hardcoded inside execution methods.
- Limit output sizes. Discord has a 2000-character limit per message. The AI service must chunk responses or instruct the LLM to be concise.

## Event Handlers and Tool Calling (MCP)

- Validate and parse Discord Message input before any AI logic runs (e.g., ignore messages from other bots or empty attachments).
- Tools exposed to the LLM (MCP) must validate unknown external parameters provided by the AI before executing local infrastructure code.
- Return consistent, predictable strings or standardized error messages from Tool calls so the LLM can interpret failures gracefully.

## Data and Storage

- MVP State (Chat History) is stored in-memory using `ConcurrentDictionary` to handle concurrent message events safely.
- Context Windows must be managed. Do not append to the history list infinitely; implement a sliding window (e.g., keep only the last 10 messages) to prevent Token Limit exhaustion and OutOfMemory errors.
- Passwords, Tokens, and API Keys strictly belong in `appsettings.json`, Environment Variables, or .NET User Secrets. Never commit secrets to the repository.

## File Organization

- `Workers/` — Background services handling the Discord connection and event routing.
- `Services/` — Core business logic, AI integration, and state management.
- `Tools/` — Classes containing methods explicitly decorated or designed to be called by the LLM (MCP Tool Calling).
- `Models/` — Immutable `record` types and DTOs for data passing.
- `Extensions/` — Setup classes for registering services in the DI container (keeping `Program.cs` clean).