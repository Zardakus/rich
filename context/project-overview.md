# AI Mentor Assistant (ChatOps)

## Overview

The AI Mentor Assistant is a real-time, event-driven ChatOps application built with .NET 8 and Discord.Net. It provides developers with on-demand technical mentoring directly within their workspace. By leveraging `Microsoft.Extensions.AI` and the Model Context Protocol (MCP), the assistant not only answers general programming queries but securely accesses local enterprise data (like internal architecture docs) to provide grounded, context-aware responses, thereby reducing context switching and improving Developer Experience (DX).

## Goals

1. Build a highly decoupled, asynchronous Discord bot using the .NET Generic Host and Background Services.
2. Abstract the LLM provider using `Microsoft.Extensions.AI` to ensure vendor neutrality (no hardcoded OpenAI/Claude SDKs).
3. Implement Tool Calling (MCP) to allow the AI to safely query local Read-Only data sources.
4. Establish a repeatable CI/CD pipeline using Docker to guarantee production-readiness.

## Core User Flow

1. Developer sends a message tagging the bot in a Discord channel or via Direct Message.
2. The Discord Gateway triggers an asynchronous event in the .NET Worker Service.
3. The system retrieves the developer's active chat session history to maintain context.
4. The AI evaluates the prompt and determines if it needs to trigger a local Tool (MCP) to fetch internal documentation.
5. If required, the C# Tool executes, fetches the local data, and returns it to the LLM.
6. The LLM generates a final, Markdown-formatted technical response.
7. The application sends the response back to the Discord channel asynchronously.

## Features

### Messaging and Event Handling

- Persistent WebSocket connection to the Discord Gateway.
- Asynchronous event offloading to prevent thread blocking and Rate Limits.
- Markdown and code-block formatting for Discord output.

### AI and Context Management

- Vendor-agnostic LLM integration via `IChatClient`.
- Dynamic System Prompt injection to enforce the "Senior Technical Mentor" persona.
- Per-user session state management (Sliding window history) to maintain conversational context without exceeding token limits.

### Tool Calling (Model Context Protocol)

- Secure exposition of C# delegates to the LLM.
- Grounding capabilities: AI can search internal markdown specs or simulated logs to answer domain-specific questions.

## Scope

### In Scope

- Discord bot authentication and event listening.
- In-memory state management for chat history (MVP scale).
- Integration with an LLM via `Microsoft.Extensions.AI`.
- Implementation of at least one local Tool Call (e.g., `SearchInternalDocsAsync`).
- Dockerfile creation for containerization.

### Out of Scope

- Multi-tenant SaaS billing or subscription tiers.
- Persistent database storage (e.g., SQL Server/Redis) for chat history (deferred to V2).
- Voice channel participation or audio processing.
- AI Image generation.

## Success Criteria

1. The bot successfully authenticates and remains online in a Discord server without dropping the connection.
2. A user can ask a multi-turn technical question, and the bot recalls the context from previous messages.
3. The bot successfully triggers a local C# method (Tool Call) when asked about "internal architecture", proving MCP capabilities.
4. The application builds successfully via `dotnet build` and runs completely inside a Docker container.