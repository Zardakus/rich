# UI / Presentation Context (Discord Native)

## Theme

The application does not have a custom frontend. The UI layer is dictated entirely by the Discord client (Desktop/Mobile). The visual theme (Dark/Light mode) is controlled by the user's local Discord settings. Our presentation responsibility is strictly limited to generating well-formatted Markdown text and structured Discord Embeds.

## Colors (Discord Embeds)

We only control the side-border color of Discord `EmbedBuilder` objects. These colors are used to convey the state or origin of a message. 

| Role                | C# Color Object       | Hex Value | Purpose |
| ------------------- | --------------------- | --------- | ------- |
| Primary / AI Action | `Color.Purple`        | `#9B59B6` | Default color for standard AI responses and mentoring. |
| Tool Call / System  | `Color.Blue`          | `#3498DB` | Used when the bot is fetching local context (e.g., "Searching docs..."). |
| Success             | `Color.Green`         | `#2ECC71` | Action completed successfully. |
| Error               | `Color.Red`           | `#E74C3C` | Exceptions, Rate Limits, or validation failures. |

## Typography & Formatting (Markdown)

We rely on Discord's native Markdown for hierarchy and readability. The AI must be instructed to format its output using these rules:

| Role          | Markdown Syntax         | Usage Context |
| ------------- | ----------------------- | ------------- |
| Emphasis      | `**text**`              | Highlighting key technical terms or conclusions. |
| Inline Code   | \`code\`                | Short variable names, class names, or CLI commands. |
| Code Blocks   | \`\`\`csharp ... \`\`\` | Multi-line code snippets. Must always include the language identifier for syntax highlighting. |
| Quotes        | `> text`                | Quoting the user's original question or citing documentation. |

## Layout Patterns & Constraints

- **The 2000 Character Limit**: Discord hard-caps standard messages at 2000 characters. The AI service must either be instructed to be concise, or the Discord Worker must implement a chunking mechanism to split long responses into sequential messages.
- **Embeds over Plain Text for Metadata**: When returning data from a Tool Call (MCP) or displaying system status, use an `Embed` rather than plain text to visually separate system information from the conversational AI response.
- **Ephemeral Messages**: Not applicable for standard channel ChatOps, but if slash commands are used later, errors should be sent ephemerally (only visible to the user who triggered the error).

## Icons (Emojis)

Avoid external image assets. Use standard Unicode Emojis or Discord default emojis to add visual anchors to plain text responses.

- 🤖 : Prefix for system-level AI notifications.
- 📚 : Prefix when referencing external documentation or Tool Calls.
- ✅ / ❌ : Success and Error indicators.