import Hero from "./Components/Hero";
import Workspace from "./Components/Workspace";
import { useState } from "react";
function App() {
  const [enteredWorkspace, setEnteredWorkspace] = useState(false);
  return enteredWorkspace ? (
  <Workspace />
  ) : (
  <Hero onEnter={() => setEnteredWorkspace(true)} />
  );
}

export default App;