# CodeGlow

The ultimate code beautifier for Python, Java, & JavaScript. Indent, format, and color-code your source files into rich text (RTF) ready for easy copying into Word processors. Built with Next.js.

![CodeGlow Screenshot](https://github.com/user-attachments/assets/fe53b4a0-385a-462a-bccf-73cafecc91e1)

## Features

- 🎨 **Multi-language support**: JavaScript, Python, and Java
- 🔧 **Smart formatting**: Uses Prettier for JavaScript, basic indentation for Python and Java
- 🌈 **Syntax highlighting**: Powered by Prism.js with color-coded tokens
- 📋 **RTF generation**: Converts formatted and highlighted code to Rich Text Format
- 📲 **Clipboard integration**: Automatically copies RTF to clipboard for easy pasting
- 💅 **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vuhung16au/CodeGlow.git
cd CodeGlow
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. Select your programming language (JavaScript, Python, or Java)
2. Paste your code into the text area
3. Click "Format & Copy RTF"
4. Paste into Microsoft Word or any RTF-compatible editor

The code will be properly formatted with:
- Correct indentation
- Syntax highlighting with colors
- Monospace font (Courier New)
- Ready-to-use RTF format

## API

The application exposes a REST API endpoint for programmatic access:

### POST `/api/format`

Formats code and returns RTF output.

**Request Body:**
```json
{
  "code": "function hello(name){console.log('Hello, '+name);}",
  "language": "javascript"
}
```

**Response:**
```json
{
  "rtf": "{\\rtf1\\ansi\\deff0 {...}",
  "formatted": "function hello(name) {\n  console.log('Hello, ' + name);\n}\n"
}
```

**Supported Languages:**
- `javascript`
- `python`
- `java`

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Prettier](https://prettier.io/) - JavaScript formatting
- [Prism.js](https://prismjs.com/) - Syntax highlighting

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
