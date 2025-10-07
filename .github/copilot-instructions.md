# GitHub Copilot Instructions for CodeGlow

## Project Overview
CodeGlow is a code beautifier application built with Next.js that formats and beautifies Python, Java, and JavaScript code. The application converts source code into rich text format (RTF) for easy copying into word processors.

## Technology Stack
- **Framework**: Next.js (React-based)
- **Deployment**: Vercel
- **Target Languages**: Python, Java, JavaScript

## Development Guidelines

### Next.js Best Practices
- Use App Router conventions when creating new routes and pages
- Implement Server Components by default; use Client Components only when necessary (interactivity, hooks, browser APIs)
- Follow Next.js file and folder naming conventions (kebab-case for files)
- Use `next/image` for image optimization
- Use `next/link` for client-side navigation
- Implement proper loading states and error boundaries
- Leverage Next.js built-in optimizations (automatic code splitting, route prefetching)

### Code Style
- Use TypeScript when possible for type safety
- Follow ESLint rules configured in the project
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### State Management
- Use React hooks (useState, useEffect, useContext) for local state
- Consider server-side state management where appropriate
- Minimize client-side state when data can be fetched server-side

### Vercel Deployment Considerations
- Ensure all environment variables are properly configured
- Use Edge Runtime for performance-critical routes when appropriate
- Follow serverless function best practices (stateless, fast cold starts)
- Optimize bundle size and implement code splitting
- Use Vercel's built-in analytics and monitoring when available

### Code Formatting Features
- When working on code beautification logic:
  - Support proper indentation for Python, Java, and JavaScript
  - Handle syntax highlighting and color-coding
  - Generate RTF output that's compatible with major word processors
  - Preserve code structure and formatting accurately
  - Handle edge cases (nested structures, comments, strings)

### Performance
- Implement lazy loading for heavy components
- Optimize images and assets
- Use caching strategies appropriately
- Monitor and optimize Core Web Vitals
- Consider streaming and suspense for better UX

### Accessibility
- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Include proper ARIA labels when necessary
- Maintain good color contrast ratios
- Test with screen readers when applicable

### Testing
- Write unit tests for utility functions
- Test edge cases in code parsing and formatting logic
- Ensure RTF output is valid and compatible
- Test across different browsers if UI changes are made

### Security
- Sanitize user inputs when processing code
- Avoid executing user-provided code
- Follow OWASP guidelines for web applications
- Keep dependencies updated

## Specific Conventions
- Use `'use client'` directive only when client-side features are required
- Prefer server-side rendering for better performance and SEO
- Use environment variables for configuration
- Follow the existing project structure and patterns
- Document complex algorithms and formatting logic
