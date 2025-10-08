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
- **Syntax Colors**: Use most common/standard syntax highlighting colors for each language:
  - **Keywords** (if, for, class, def, etc.): `#cf222e` (red)
  - **Strings**: `#0a3069` (dark blue)
  - **Comments**: `#59636e` (gray)
  - **Functions**: `#8250df` (purple)
  - **Numbers**: `#0550ae` (blue)
  - **Operators**: `#000000` (black)
  - **Punctuation**: `#000000` (black)
  - **Classes**: `#953800` (orange)
  - **Variables**: `#000000` (black)
  - **Default**: `#000000` (black)

These colors should work well on a white background and are compatible with common syntax highlighting themes.

## Output Requirements

- Proper indentation for all supported languages
- Syntax highlighting with color-coding
- RTF format compatible with major word processors (Microsoft Word, Google Docs, etc.)
- White background for code blocks
- Preserved code structure and formatting
- Handling of edge cases (nested structures, comments, strings)
