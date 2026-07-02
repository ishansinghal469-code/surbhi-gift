import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TarotBackground from "../componets/TarotBackground";

function AddTarotReading() {
  const [question, setQuestion] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tarotcards/")
      .then((response) => setCards(response.data))
      .catch((error) => console.log(error));
  }, []);

  const toggleCard = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/tarotreadings/", {
        question,
        interpretation,
        cards: selectedCards,
      });

      navigate("/tarot");
    } catch (error) {
      console.log(error);
    }
  };

  const inputClasses =
    "w-full rounded-md border border-amber-500/20 bg-[#1c140b]/70 px-4 py-3 text-amber-50 placeholder:text-amber-300/30 outline-none transition focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30";

  return (
    <TarotBackground>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-amber-400/50">
            please trust me i believe in it
          </p>
          <h1 className="font-serif italic text-4xl tracking-wide text-amber-100">
            Add Tarot Reading
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={inputClasses}
          />

          <textarea
            placeholder="Interpretation"
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
            rows={5}
            className={`${inputClasses} resize-none`}
          />

          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-amber-400/60">
              Select Cards
            </label>

            <div className="flex flex-wrap gap-2">
              {cards.map((card) => {
                const isSelected = selectedCards.includes(
                  String(card.id)
                );
                return (
                  <button
                    type="button"
                    key={card.id}
                    onClick={() => toggleCard(String(card.id))}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      isSelected
                        ? "border-amber-400/70 bg-amber-700/30 text-amber-100"
                        : "border-amber-500/20 bg-[#1c140b]/60 text-amber-200/60 hover:border-amber-400/40 hover:text-amber-100"
                    }`}
                  >
                    {card.name}
                  </button>
                );
              })}
            </div>

            {cards.length === 0 && (
              <p className="text-sm text-amber-300/40">
                No cards available yet.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-amber-700 to-amber-900 py-3 text-sm uppercase tracking-wider text-amber-50 transition hover:from-amber-600 hover:to-amber-800"
          >
            Add Reading
          </button>
        </form>
      </div>
    </TarotBackground>
  );
}

export default AddTarotReading;