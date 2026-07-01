import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBackground from "../componets/Background";

function AddPlaylist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("spotify_link", spotifyLink);

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/playlists/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/playlists");
    } catch (error) {
      console.log(error);
    }
  };

  const inputClasses =
    "w-full rounded-md border border-purple-400/20 bg-[#1c1124]/60 px-4 py-3 text-purple-50 placeholder:text-purple-300/40 outline-none transition focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/40";

  return (
    <PageBackground>
      <div className="mx-auto max-w-lg">
        <h2 className="mb-8 font-[Cormorant_Garamond] text-3xl italic text-purple-100">
          Add Playlist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`${inputClasses} resize-none`}
          />

          <input
            type="url"
            placeholder="Spotify Link"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            className={inputClasses}
          />

          <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-purple-400/30 bg-[#1c1124]/40 px-4 py-3 text-sm text-purple-300/60 transition hover:border-purple-400/60">
            <span>{fileName || "Choose cover image"}</span>
            <span className="text-xs uppercase tracking-wider text-purple-400">
              browse
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setCoverImage(file);
                setFileName(file ? file.name : "");
              }}
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-800 py-3 text-sm uppercase tracking-wider text-purple-50 transition hover:from-purple-600 hover:to-fuchsia-700"
          >
            Add Playlist
          </button>
        </form>
      </div>
    </PageBackground>
  );
}

export default AddPlaylist;