import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaylistCard from "../componets/PlaylistCard";
import PageBackground from "../componets/Background";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://surbhi-gift.onrender.com/api/playlists/")
      .then((response) => setPlaylists(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageBackground>
        <p className="text-center font-[Cormorant_Garamond] text-2xl italic text-purple-200/70">
          loading bihh wait
        </p>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-[Cormorant_Garamond] text-3xl italic text-purple-100">
            aapke gaane
          </h2>

          <Link to="/playlists/add">
            <button className="rounded-full border border-purple-400/40 bg-purple-900/30 px-5 py-2 text-sm uppercase tracking-wider text-purple-100 transition hover:bg-purple-700/40">
              + Add those pop songs 
            </button>
          </Link>
        </div>

        {playlists.length === 0 ? (
          <p className="text-purple-300/60">
            hwwwwwww you deleted the playlist i made
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default Playlists;