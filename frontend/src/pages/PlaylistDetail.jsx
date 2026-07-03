import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageBackground from "../componets/Background";

function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    axios
      .get(`https://surbhi-gift.onrender.com/api/playlists/${id}/`)
      .then((response) => setPlaylist(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!playlist) {
    return (
      <PageBackground>
        <p className="text-center font-[Cormorant_Garamond] text-2xl italic text-purple-200/70">
          loading playlist…
        </p>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <div className="mx-auto max-w-2xl">
        <Link
          to="/playlists"
          className="mb-8 inline-block text-sm uppercase tracking-wider text-purple-300/60 transition hover:text-purple-100"
        >
          ← Back
        </Link>

        <div className="overflow-hidden rounded-lg bg-gradient-to-b from-[#2a1a33] to-[#1a1022] shadow-xl shadow-purple-950/50 ring-1 ring-purple-900/40">
          {playlist.cover_image && (
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={playlist.cover_image}
                alt={playlist.title}
                className="h-full w-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1022]/95 via-purple-900/30 to-fuchsia-900/10 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-purple-700/20 mix-blend-color" />
            </div>
          )}

          <div className="space-y-4 px-8 py-8">
            <h1 className="font-[Cormorant_Garamond] text-4xl italic tracking-wide text-purple-50">
              {playlist.title}
            </h1>

            <p className="leading-relaxed text-purple-300/70">
              {playlist.description}
            </p>
            {playlist.spotify_link && (
              <a
                href={playlist.spotify_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-800 px-6 py-3 text-sm uppercase tracking-wider text-purple-50 transition hover:from-purple-600 hover:to-fuchsia-700"
              >
                Open in Spotify
              </a>
            )}



          </div>
        </div>
      </div>
    </PageBackground >
  );
}

export default PlaylistDetail;