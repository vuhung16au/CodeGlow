'use client';

import { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isFormatting, setIsFormatting] = useState(false);
  const [message, setMessage] = useState('');
  const [formattedHtml, setFormattedHtml] = useState('');
  const [rtfData, setRtfData] = useState('');

  const handleFormat = async () => {
    setIsFormatting(true);
    setMessage('');
    setFormattedHtml('');
    setRtfData('');
    
    try {
      const response = await fetch('/api/format', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('Formatting failed');
      }

      const data = await response.json();
      
      // Store the formatted output
      if (data.html) {
        setFormattedHtml(data.html);
      }
      if (data.rtf) {
        setRtfData(data.rtf);
      }
      setMessage('✓ Code formatted successfully! Click "Copy to clipboard" to copy.');
    } catch (error) {
      setMessage('✗ Error formatting code: ' + (error as Error).message);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleCopyRtf = async () => {
    if (!rtfData) return;
    
    try {
      // Create a ClipboardItem with RTF data
      // For RTF to work in word processors, we need to write it as 'text/rtf'
      const rtfBlob = new Blob([rtfData], { type: 'text/rtf' });
      const plainTextBlob = new Blob([rtfData], { type: 'text/plain' });
      
      // Use ClipboardItem to write both RTF and plain text
      const clipboardItem = new ClipboardItem({
        'text/rtf': rtfBlob,
        'text/plain': plainTextBlob,
      });
      
      await navigator.clipboard.write([clipboardItem]);
      setMessage('✓ Formatted code copied to clipboard! You can now paste it into Word, Google Docs, or any text editor.');
    } catch (error) {
      // Fallback: if ClipboardItem fails, try plain text
      try {
        await navigator.clipboard.writeText(rtfData);
        setMessage('✓ RTF code copied to clipboard as text. Paste into a text editor and save as .rtf file.');
      } catch {
        setMessage('✗ Error copying to clipboard: ' + (error as Error).message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            CodeGlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The ultimate code beautifier for Python, Java, & JavaScript
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Input</h2>
            
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="language" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code Input:
              </label>
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Paste your ${language} code here...`}
                className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            </div>

            <button
              onClick={handleFormat}
              disabled={isFormatting || !code.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              {isFormatting ? 'Formatting...' : 'Format It'}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Output</h2>
            
            {!formattedHtml && (
              <div className="flex items-center justify-center h-[500px] text-gray-400 dark:text-gray-500">
                <p>Formatted code will appear here...</p>
              </div>
            )}

            {formattedHtml && (
              <>
                <div className="mb-4 p-4 bg-white rounded-md border border-gray-200 dark:border-gray-700 overflow-auto h-96">
                  <pre 
                    className="font-mono text-sm"
                    dangerouslySetInnerHTML={{ __html: formattedHtml }}
                  />
                </div>

                <button
                  onClick={handleCopyRtf}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Copy to clipboard
                </button>
              </>
            )}
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-md ${message.startsWith('✓') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
            {message}
          </div>
        )}

        <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">Format your code with proper indentation and syntax highlighting, then copy to clipboard</p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://github.com/vuhung16au/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              GitHub
            </a>
            <span>•</span>
            <a 
              href="https://www.linkedin.com/in/nguyenvuhung/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
