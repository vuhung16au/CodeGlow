import { NextRequest, NextResponse } from 'next/server';
import prettier from 'prettier';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';

// Color palette for syntax highlighting (matching common themes)
const COLORS = {
  keyword: '#cf222e',
  string: '#0a3069',
  comment: '#59636e',
  function: '#8250df',
  number: '#0550ae',
  operator: '#000000',
  punctuation: '#000000',
  class: '#953800',
  variable: '#000000',
  default: '#000000',
};

// Map Prism token types to our color scheme
function getColorForToken(type: string): string {
  if (type.includes('keyword')) return COLORS.keyword;
  if (type.includes('string')) return COLORS.string;
  if (type.includes('comment')) return COLORS.comment;
  if (type.includes('function')) return COLORS.function;
  if (type.includes('number')) return COLORS.number;
  if (type.includes('operator')) return COLORS.operator;
  if (type.includes('punctuation')) return COLORS.punctuation;
  if (type.includes('class')) return COLORS.class;
  return COLORS.default;
}

// Convert hex color to RTF color format
function hexToRtfColor(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Build RTF color table from our color palette
function buildRtfColorTable(): string {
  const colors = Object.values(COLORS);
  const uniqueColors = [...new Set(colors)];
  const colorTable = uniqueColors
    .map((hex) => {
      const { r, g, b } = hexToRtfColor(hex);
      return `\\red${r}\\green${g}\\blue${b};`;
    })
    .join('');
  return `{\\colortbl;${colorTable}}`;
}

// Get color index in RTF color table
function getColorIndex(hex: string): number {
  const colors = Object.values(COLORS);
  const uniqueColors = [...new Set(colors)];
  return uniqueColors.indexOf(hex) + 1;
}

// Escape RTF special characters
function escapeRtf(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\n/g, '\\line\n')
    .replace(/\t/g, '    '); // Convert tabs to spaces
}

// Convert Prism tokens to RTF
function tokensToRtf(tokens: (string | Prism.Token)[]): string {
  let rtf = '';

  function processToken(token: string | Prism.Token): void {
    if (typeof token === 'string') {
      rtf += escapeRtf(token);
    } else {
      const color = getColorForToken(token.type);
      const colorIndex = getColorIndex(color);
      const content = typeof token.content === 'string' 
        ? token.content 
        : Array.isArray(token.content)
        ? token.content.map(t => typeof t === 'string' ? t : t.content).join('')
        : '';
      
      rtf += `\\cf${colorIndex} ${escapeRtf(content)}\\cf0 `;
    }
  }

  tokens.forEach(processToken);
  return rtf;
}

// Basic indentation for non-JavaScript languages
function basicIndent(code: string, language: string): string {
  const lines = code.split('\n');
  let indentLevel = 0;
  const indentSize = 2;
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push('');
      continue;
    }

    // Decrease indent for closing braces/brackets
    if (language === 'java' && (trimmed.startsWith('}') || trimmed === '}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    } else if (language === 'python' && trimmed.match(/^(return|break|continue|pass)/)) {
      // Keep same level for these keywords
    }

    // Add indented line
    result.push(' '.repeat(indentLevel * indentSize) + trimmed);

    // Increase indent after opening braces or colons
    if (language === 'java' && trimmed.endsWith('{')) {
      indentLevel++;
    } else if (language === 'python' && trimmed.endsWith(':')) {
      indentLevel++;
    }

    // Handle closing in same line
    if (language === 'java' && trimmed.includes('{') && trimmed.endsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
  }

  return result.join('\n');
}

// Format code using prettier for JS, basic indent for others
async function formatCode(code: string, language: string): Promise<string> {
  try {
    if (language === 'javascript') {
      // Use Prettier for JavaScript
      const formatted = await prettier.format(code, {
        parser: 'babel',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80,
      });
      return formatted;
    } else {
      // Use basic indentation for Python and Java
      return basicIndent(code, language);
    }
  } catch (error) {
    // If formatting fails, return original code
    console.error('Formatting error:', error);
    return code;
  }
}

// Highlight code with Prism
function highlightCode(code: string, language: string): (string | Prism.Token)[] {
  const languageMap: { [key: string]: string } = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
  };

  const prismLanguage = languageMap[language] || 'javascript';
  const grammar = Prism.languages[prismLanguage];
  
  if (!grammar) {
    return [code];
  }

  return Prism.tokenize(code, grammar) as (string | Prism.Token)[];
}

// Convert highlighted code to RTF
function convertToRtf(tokens: (string | Prism.Token)[]): string {
  const colorTable = buildRtfColorTable();
  const rtfHeader = '{\\rtf1\\ansi\\deff0 {\\fonttbl{\\f0\\fmodern\\fprq1\\fcharset0 Courier New;}}';
  const rtfBody = tokensToRtf(tokens);
  
  return `${rtfHeader}${colorTable}\\f0\\fs20 ${rtfBody}}`;
}

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code is required and must be a string' },
        { status: 400 }
      );
    }

    if (!['javascript', 'python', 'java'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be javascript, python, or java' },
        { status: 400 }
      );
    }

    // Step 1: Format the code
    const formattedCode = await formatCode(code, language);

    // Step 2: Apply syntax highlighting
    const tokens = highlightCode(formattedCode, language);

    // Step 3: Convert to RTF
    const rtf = convertToRtf(tokens);

    return NextResponse.json({
      rtf,
      formatted: formattedCode,
    });
  } catch (error) {
    console.error('Error in format API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
