# Core Logic & Output Requirements

## Formatting Chain

The backend task is a clear pipeline that must be followed:

**Raw Code → Indented Code → Highlighted HTML → RTF String**

Copilot must adhere to this flow.

## Multi-Language Support

All formatting and highlighting functions must handle the distinct syntax of **Python**, **Java**, and **JavaScript** correctly.

## Client Logic

The frontend must use the native **Clipboard API** to copy the RTF string into the clipboard with proper MIME types (`text/rtf` and `text/plain` as fallback), not just plain text.

## Clipboard Style Policy

When code is copied to the clipboard:

- **Background**: White (`#FFFFFF`) - RTF uses `\highlight1` or `\cb1` with white as the first color in the color table
- **Font**: Courier New, monospace, 10pt (RTF `\fs20` means 10pt since font size is in half-points)
- **Syntax Colors**: Use high-contrast, vibrant colors optimized for visibility in MS Word (both Light and Dark mode):
  - **Keywords** (if, for, class, def, import, etc.): `#d73a49` (bright red)
  - **Strings**: `#032f62` (dark blue)
  - **Comments**: `#6a737d` (medium gray)
  - **Functions**: `#6f42c1` (purple)
  - **Numbers**: `#005cc5` (bright blue)
  - **Operators** (+, -, *, =, etc.): `#d73a49` (bright red)
  - **Punctuation** (brackets, commas, etc.): `#24292e` (dark gray)
  - **Classes**: `#6f42c1` (purple)
  - **Variables**: `#24292e` (dark gray)
  - **Default**: `#24292e` (dark gray)

These colors are designed to be visible in MS Word regardless of viewing mode (Light/Dark mode with white or dark page colors).

## Output Requirements

- Proper indentation for all supported languages
- Syntax highlighting with color-coding
- RTF format compatible with major word processors (Microsoft Word, Google Docs, etc.)
- White background for code blocks
- Preserved code structure and formatting
- Handling of edge cases (nested structures, comments, strings)
