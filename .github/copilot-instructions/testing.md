# Testing Requirements

## Unit Testing

- Write unit tests for utility functions
- Whenever possible for core utility functions (especially RTF conversion and language formatting), include a basic **unit test** file (e.g., using Jest) to cover the primary "happy path" case

## Code-Specific Testing

- Test edge cases in code parsing and formatting logic
- Ensure RTF output is valid and compatible
- Test across different browsers if UI changes are made

## Coverage

- Focus on testing critical paths
- Test the formatting pipeline components
- Verify syntax highlighting works correctly for all supported languages
