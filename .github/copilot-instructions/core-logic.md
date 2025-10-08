# Core Logic & Output Requirements

## Formatting Chain

The backend task is a clear pipeline that must be followed:

**Raw Code → Indented Code → Highlighted HTML → RTF String**

Copilot must adhere to this flow.

## Multi-Language Support

All formatting and highlighting functions must handle the distinct syntax of **Python**, **Java**, and **JavaScript** correctly.

## Client Logic

The frontend must use the native **Clipboard API** to copy the RTF string into the clipboard, not just the plain text.

## Output Requirements

- Proper indentation for all supported languages
- Syntax highlighting with color-coding
- RTF format compatible with major word processors (Microsoft Word, etc.)
- Preserved code structure and formatting
- Handling of edge cases (nested structures, comments, strings)
