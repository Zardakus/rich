# AI Workflow Rules: Mentor AI Assistant (.NET/Discord)

## Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and the current state of progress. Always implement against these specs — do not infer or invent behavior from scratch. 

This project strictly adheres to Clean Architecture principles, Event-Driven patterns (Discord Gateway), and Dependency Injection. AI features must use abstractions (`Microsoft.Extensions.AI`) and never hardcode specific LLM vendor SDKs.

## Scoping Rules

- Work on one feature unit or subsystem at a time.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated system boundaries in a single implementation step.

## When to Split Work

Split an implementation step if it combines:

- Discord Gateway event handling (e.g., `MessageReceived`) and heavy AI/LLM processing logic (always use offloading/`Task.Run` for the latter).
- In-memory state management (Chat History) and Tool Calling/MCP (Model Context Protocol) implementations.
- Multiple unrelated Discord commands or Domain Services.
- Behavior that is not clearly defined in the context files.

If a change cannot be verified end-to-end quickly without blocking the Discord WebSocket connection, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior that is not defined in the context files.
- If a requirement is ambiguous, resolve it in the relevant context file before implementing.
- If a requirement is missing, add it as an open question in `progress-tracker.md` before continuing.

## Protected Files

Do not modify the following unless explicitly instructed:

- `Program.cs` and core Dependency Injection bootstrap logic (Services registration).
- `DiscordBotWorker.cs` lifecycle methods (Startup/Shutdown sequences).
- Generated files (e.g., EF Core `Migrations/*` if added later).

These foundation components ensure the stability of the long-running `BackgroundService` and should remain highly decoupled. Project-specific logic must be implemented in dedicated App/Domain services.

## Keeping Docs In Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries (e.g., switching from In-Memory to Redis for state).
- Storage model decisions.
- Code conventions or standards (e.g., async/await suffix enforcement).
- Feature scope.

Progress state must reflect the actual state of the implementation, not the intended state.

## Before Moving To The Next Unit

1. The current unit works end-to-end within its defined scope without causing Rate Limits or Gateway timeouts.
2. No invariant defined in `architecture-context.md` was violated (e.g., DI scope rules: Singleton vs Transient).
3. `progress-tracker.md` reflects the completed work.
4. `dotnet build` and `dotnet test` pass successfully with zero warnings.