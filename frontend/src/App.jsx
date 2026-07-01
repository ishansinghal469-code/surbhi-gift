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
import Expenses from "./pages/Expenses";
import Tarot from "./pages/Tarot";
import AddExpense from "./pages/AddExpense";
import ExpenseDetail from "./pages/ExpenseDetail";
import PlaylistDetail from "./pages/PlaylistDetail";
import AddPlaylist from "./pages/AddPlaylist";
import Playlists from "./pages/Playlist";
import AddTarotReading from "./pages/AddTarotReading";
import Outfits from "./pages/Outfits";
import AddOutfit from "./pages/AddOutfit";
import OutfitDetail from "./pages/OutfitDetail";
import AddLoveLetter from "./pages/AddLoveLetter";
import LoveLetters from "./pages/LoveLetters";
import LoveLetterDetail from "./pages/LoveLetterDetail";
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
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/tarot" element={<Tarot />} />
        <Route path="/expenses/add" element={<AddExpense />} />
        <Route path="/expenses/:id" element={<ExpenseDetail />} />
        <Route path="/playlists/:id" element={<PlaylistDetail />} />
        <Route path="/playlists/add" element={<AddPlaylist />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/tarot/add" element={<AddTarotReading />} />
        <Route path="/Outfits" element={<Outfits />} />
        <Route path="/Outfits/add" element={<AddOutfit />} />
        <Route path="/Outfits/:id" element={<OutfitDetail />} />
        <Route path="/letters" element={<LoveLetters />} />
        <Route path="/letters/add" element={<AddLoveLetter />} />
        <Route path="/letters/:id" element={<LoveLetterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;