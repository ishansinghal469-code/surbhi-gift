import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Gallery from "./pages/Gallery";
import Books from "./pages/Books";
import Planner from "./pages/Planner";
import MemoryDetail from "./pages/MemoryDetail"; 
import AddMemory from "./pages/AddMemory";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import AddDay from "./pages/AddDay";
import AddTask from "./pages/AddTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/books" element={<Books />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/memories/:id" element={<MemoryDetail />} />
        <Route path="/memories/add" element={<AddMemory />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/planner/add-day" element={<AddDay />} />
        <Route path="/planner/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;