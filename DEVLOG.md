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

# August 10, 2026

## Accomplished

- Completed the remaining ENGG-101 workspace UI states.
- Added the frontend UI for:
  - Uploaded Documents
  - Quizzes
  - Flashcards
  - Notes
  - Settings
- Kept the components structured around data-driven rendering so they can be connected to backend data later.
- Added the new components to the existing `Workspace.jsx` state-based navigation.
- Connected the different sidebar states to their corresponding components.
- Added frontend placeholders/callbacks for functionality that will later be handled by the backend, such as:
  - Document uploads
  - Starting quizzes
  - Studying flashcard sets
  - Loading documents, quizzes, flashcards, and notes from backend data
- Kept the existing ENGG-101 black/amber visual style consistent across the new components.
- Finished the current frontend UI phase.

## Learned

- How to structure larger React interfaces into separate reusable components.
- How to render different components based on application state.
- How to design components around data that will eventually come from a backend.
- Why separating UI components from backend/data logic makes future integration easier.
- How callback props can act as placeholders for functionality that will be implemented later.

## Next Session

- Begin a full frontend code review.
- Go through the project files one by one and understand exactly what each component does.
- Review the React state, props, callbacks, effects, component relationships, and data flow.
- Identify anything that should be cleaned up or changed before starting the backend.
- Map out exactly what data the backend will need to provide to each frontend component.

# August 11, 2026

## Accomplished

- Reviewed all the frontend components in the codebase.
- Removed unused `Hero.jsx` and the unused `Flashcard.jsx` component.

## Learned

- How React list rendering works with `.map()`.
- Difference between a React `key` and a normal component prop.
- How objects are passed between parent and child components.
- How selection state is propagated between components.
- How conditional Tailwind classes work with the ternary operator.
- How frontend placeholder data is structured so it can later be replaced with backend/API data.
- How the current frontend architecture is designed to accept real backend data without requiring the UI components to be rebuilt.

## Notes

### Backend Integration

The current UI components are essentially prepared to receive real data later.

Expected data structures include:

- `messages` → AI chat messages
- `documents` → uploaded documents
- `notes` → generated/stored notes
- `quizzes` → generated quizzes

The backend should eventually provide objects with the fields the frontend already expects, allowing the UI to remain mostly unchanged.

### React Review Notes

- `useState()` stores changing component state.
- `useEffect()` handles side effects after rendering.
- `useEffect(..., [])` runs once when a component mounts.
- `.map()` generates UI from arrays.
- `key={item.id}` gives React a stable identity for list items.
- `item={item}` passes the entire object as a prop.
- `onSelect(item.id)` allows a child component to notify the parent about a selection.
- Conditional rendering/classes can use ternaries.
- Callback props allow parent-controlled state to be triggered from child components.

# September 24, 2026

## Accomplished

- Built the FastAPI backend (`backend/main.py`) with a single `/chat` endpoint.
- Installed Python, pip, FastAPI, uvicorn, and httpx.
- Installed Ollama and pulled a local model.
- Wired `handleSendMessage` in `Workspace.jsx` to call the backend via `fetch` instead of only appending the user's own message.
- Added `isAssistantTyping` state handling around the request so the existing `TypingIndicator` reflects real loading time.
- Added a real error-fallback message if the backend request fails, instead of leaving the UI silently broken.
- Confirmed the full pipeline works end-to-end: message sent from the chat UI → FastAPI → Ollama → real model reply displayed back in the chat.

## Learned

- The difference between FastAPI (defines the API) and uvicorn (actually runs/serves it).
- CORS middleware is required for the browser to be allowed to call a different local port.
- `ollama cp` creates a lightweight alias to a model without duplicating it on disk.

## Next Session

- Improve prompting — qwen2.5-coder is a code-focused model, so general chat replies feel weaker than expected; consider a system prompt tailored to tutoring/explanations.
- Wire real document upload, storage, and retrieval to replace `MOCK_DOCUMENTS`.
- Start planning how uploaded documents feed into notes/quiz generation.
- Consider giving the chat model context from uploaded notes (RAG-style) rather than just the raw user message.

## Notes

- Architecture stays frontend-first, backend-decoupled: `Workspace.jsx` owns all chat state and the API call, so swapping the backend's internals later (e.g. different model, hosted API) won't require frontend changes.
- Deployment note: Vercel cannot host Ollama (no GPU, no persistent process) — for this project, a demo video is being used instead of a live public deployment.

# September 27, 2026

## Accomplished

- Fixed a layout bug where the entire page (including the sidebar) became scrollable as chat messages accumulated, locked the outer container to viewport height and added `min-h-0` down the flex chain so only inner content areas scroll independently.
- Added document upload support to the backend: `POST /documents` (saves the file to disk, records metadata) and `GET /documents` (returns the list) in `main.py`.
- Installed `python-multipart`, required by FastAPI to parse file upload requests.
- Wired `Documents.jsx` to open a real native file picker instead of a bare button click.
- Wired `Workspace.jsx` to fetch real documents from the backend when the Documents tab opens, and to actually POST a picked file to the backend, updating the UI immediately on success.
- Confirmed uploads and listing work end-to-end through both `/docs` (FastAPI's interactive test page) and the real frontend UI.

## Learned

- Flex children have an implicit minimum height based on their content, which silently overrides a fixed parent height (`h-screen`) unless `min-h-0` is explicitly set, this is why the scroll bug happened despite the outer container already being height-constrained.
- `FormData` is the format the browser needs to send a file over `fetch`, matching what FastAPI's `UploadFile` expects on the other end.
- Uploading a file and actually giving an AI access to its contents are two separate problems — right now the backend only stores raw bytes and metadata; the model has no access to what's actually inside the file.

## Next Session

- Extract text from uploaded documents (PDF via `pypdf`/`pdfplumber`, `.docx` via `python-docx`).
- Feed extracted document text into the `/chat` prompt so the AI can actually answer questions about uploaded material.
- Wire up the upload icon inside the AI Chat input bar (`AIChat.jsx`) — currently a no-op button — reusing the same upload logic built for the Documents tab.

## Notes

- Document storage is currently just an in-memory Python list (`documents_db`) plus files saved to a local `uploads/` folder — resets on every backend restart. A real database (SQLite, per the README's planned stack) will replace this once the feature set stabilizes.