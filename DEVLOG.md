# ENGG-101 Development log

## July 21 2026
### Git
What i learned:
- Version control systems, advantages, disadvantages and types (VCS, CVCS, DVCS).
- Difference between Github and Git. Git is a DVCS (distributed Version Control System) while Github is a host for the Git projects.
- Basic Git operations (git clone, git remote, git status, git add, git commit and git push).
- opening a file from repo in VS code (git code).

## July 22 2026
### JavaScript
What i learned:
- Running JS code using a HTML file.
- Declaring variables.
- NVM (node version manager) -> NVM is used to control which Node version should be used.
- Node.js -> JS runtime enviorment needed to run JS outside of web browser.
- Different data types in JS (Number, BigInt, String, boolean, null and Undefined).
- Object -> stores collection of data.
- symbol -> creates unique identifiers for **objects**.
- typeof operator -> returns input datatype.

## july 23 2026
### JS
What i learned:
- conditionals (very similar to C).
- functions.

## july 24 2026
### JS
What i learned:
- function types (arrow functions and anonymous functions).
- Call stack.

## july 27 2026
### JS
what i learned:
- loops and arrays
- Array methods (map, filter, reduce, etc.)

## August 3, 2026
### Accomplished
- Installed React using Vite.
- Set up the frontend project.
- Successfully ran my first React application.
- Connected the frontend to the ENGG-101 repository.

### Learned
- React apps are created using Vite.
- `npm run dev` starts the development server.
- The browser updates automatically when I save changes (HMR).

# August 5, 2026
## Accomplished
- Created first React landing page.
- Learned how React components work.
- Broke the UI into reusable components.
- Customized the hero section.
- Added GitHub repo link to the footer.

## Learned
- React components (.jsx)
- Import/export components
- Tailwind utility classes
- Responsive text using clamp()
- Basic project structure in React

# August 6, 2026

## Accomplished
- Finished the ENGG-101 landing page (Hero).
- Switched the color palette from green to amber.
- Created the initial `Workspace.jsx` component.
- Connected the landing page and workspace using React state (`useState`).
- Learned how parent-child communication works in React using props and callback functions (`onEnter`).

## Learned
- React state with `useState`.
- Conditional rendering using the ternary operator.
- Passing functions as props.
- Event handling with `onClick`.
- Difference between components and application state.
- Why React updates the UI without refreshing the page.

## Next Session
- Polish spacing, colors, typography and workspace as a whole.

## Notes
- Current architecture:
  - `Hero.jsx` (Landing)
  - `Workspace.jsx`
  - `App.jsx` controls navigation using state.
- Will migrate to React Router later once the app grows.
- Backend/authentication will eventually handle navigation and persistence instead of local state.

# August 7, 2026

## Accomplished

- Continued developing the ENGG-101 workspace UI.
- Implemented the reusable `Typewriter.jsx` component.
- Added the typing animation to the workspace welcome message.
- Added the `quote.jsx` component.
- Integrated the daily quote into `Workspace.jsx`.
- Added `onComplete` handling to coordinate the quote/author typing sequence.
- Completed the initial AI Chat interface.
- Established the sidebar structure for:
  - AI Chat
  - Uploaded Documents
  - Quizzes
  - Flashcards
  - Notes
  - Settings
- Confirmed that sidebar selections will dynamically display their respective components in the main workspace area.

## Learned

- Creating reusable React components.
- Passing props such as `text`, `speed`, and `className`.
- Using `useEffect` for timed UI behavior.
- Using `Math.random()` to select random data.
- Coordinating multiple components through callback props.
- Separating UI components based on responsibility.
- Using conditional rendering to switch workspace content.

## Next Session

- Review the frontend files one by one and understand exactly how everything currently works.
- Clean up/refactor anything that needs improvement.
- Make sure the frontend architecture is solid before starting backend development.
- Begin planning the backend architecture and how it will connect to the existing frontend.

## Notes

- The major UI structure is now essentially complete.
- Remaining UI components are mostly placeholders for backend-driven functionality:
  - Uploaded Documents
  - Flashcards
  - Notes
  - Quizzes
  - Settings
- AI Chat UI is complete; functionality will be connected during backend development.
- The next major phase is understanding the existing codebase and beginning backend integration.