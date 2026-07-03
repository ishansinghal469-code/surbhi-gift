// src/pages/Tarot.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TarotBackground from "../componets/TarotBackground";

function Tarot() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://surbhi-gift.onrender.com/api/tarotreadings/")
      .then((response) => setReadings(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <TarotBackground>
        <p className="pt-32 text-center italic text-amber-200/60">
          shuffling the cards…
        </p>
      </TarotBackground>
    );
  }

  return (
    <TarotBackground>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-amber-400/50">
            i genuienly believe in it 
          </p>
          <h1 className="font-serif italic text-4xl tracking-wide text-amber-100">
            Tarot Readings
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        <div className="mb-10 text-center">
          <Link to="/tarot/add">
            <button className="rounded-full border border-amber-500/30 bg-amber-900/20 px-6 py-2 text-sm uppercase tracking-wider text-amber-100 transition hover:bg-amber-700/30">
              + Add Reading
            </button>
          </Link>
        </div>

        <div className="space-y-10">
          {readings.map((reading) => (
            <div
              key={reading.id}
              className="rounded-lg border border-amber-500/15 bg-[#241a0f]/70 p-6 shadow-xl shadow-black/40 backdrop-blur-sm"
            >
              <h2 className="font-serif italic text-2xl text-amber-100">
                {reading.question}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-wider text-amber-400/50">
                {new Date(reading.date).toLocaleDateString()}
              </p>

              <p className="mt-4 leading-relaxed text-amber-100/70">
                {reading.interpretation}
              </p>

              <h3 className="mb-4 mt-8 text-xs uppercase tracking-[0.2em] text-amber-400/60">
                Cards Drawn
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {reading.cards.map((card) => (
                  <div
                    key={card.id}
                    className="overflow-hidden rounded-md border border-amber-500/20 bg-[#1c140b]/80"
                  >
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c140b]/80 via-transparent to-amber-900/10" />
                    </div>

                    <div className="space-y-1.5 px-4 py-4">
                      <h4 className="font-serif italic text-lg text-amber-100">
                        {card.name}
                      </h4>

                      <p className="text-sm text-amber-200/60">
                        <span className="text-amber-400/70">Arcana:</span>{" "}
                        {card.arcana}
                      </p>

                      {card.suit && (
                        <p className="text-sm text-amber-200/60">
                          <span className="text-amber-400/70">Suit:</span>{" "}
                          {card.suit}
                        </p>
                      )}

                      <p className="text-sm text-amber-200/60">
                        <span className="text-amber-400/70">Upright:</span>{" "}
                        {card.meaning_upright}
                      </p>

                      <p className="text-sm text-amber-200/60">
                        <span className="text-amber-400/70">Reversed:</span>{" "}
                        {card.meaning_reversed}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {readings.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-10">
            what were you expecting add them youself and remember i believe in it
          </p>
        )}
    </TarotBackground>
  );
}

export default Tarot;