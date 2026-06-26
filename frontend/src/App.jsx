import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Gallery from "./pages/Gallery";
import Books from "./pages/Books";
import Planner from "./pages/Planner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/books" element={<Books />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;