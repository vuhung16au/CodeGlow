# Next.js Best Practices

## App Router

- Use App Router conventions when creating new routes and pages
- Avoid legacy Pages Router syntax

## Component Types

- Implement Server Components by default
- Use Client Components only when necessary (interactivity, hooks, browser APIs)

## File Conventions

- Follow Next.js file and folder naming conventions (kebab-case for files)

## Built-in Features

- Use `next/image` for image optimization
- Use `next/link` for client-side navigation
- Implement proper loading states and error boundaries
- Leverage Next.js built-in optimizations (automatic code splitting, route prefetching)

## State Management

- Use React hooks (useState, useEffect, useContext) for local state
- Consider server-side state management where appropriate
- Minimize client-side state when data can be fetched server-side

## Vercel Deployment Considerations

- Ensure all environment variables are properly configured
- Use Edge Runtime for performance-critical routes when appropriate
- Follow serverless function best practices (stateless, fast cold starts)
- Optimize bundle size and implement code splitting
- Use Vercel's built-in analytics and monitoring when available
