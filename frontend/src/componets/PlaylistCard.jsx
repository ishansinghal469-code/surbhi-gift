import { Link } from "react-router-dom";

function PlaylistCard({ playlist }) {
  return (
    <Link
      to={`/playlists/${playlist.id}`}
      className="group block w-full max-w-xs overflow-hidden rounded-lg bg-gradient-to-b from-[#2a1a33] to-[#1a1022] shadow-lg shadow-purple-950/40 ring-1 ring-purple-900/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-purple-700/30"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {playlist.cover_image && (
          <img
            src={playlist.cover_image}
            alt={playlist.title}
            className="h-full w-full object-cover opacity-90 mix-blend-luminosity grayscale-[20%] transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
        )}
        {/* duotone purple overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1022]/90 via-purple-900/30 to-fuchsia-900/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-purple-700/20 mix-blend-color" />
      </div>

      <div className="space-y-1 px-4 py-3">
        <h2 className="truncate font-[Cormorant_Garamond] text-lg italic tracking-wide text-purple-100">
          {playlist.title}
        </h2>
        <p className="line-clamp-2 text-sm text-purple-300/70">
          {playlist.description}
        </p>
      </div>
    </Link>
  );
}

export default PlaylistCard;