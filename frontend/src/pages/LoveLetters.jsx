import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoveLetterCard from "../componets/LoveLetterCard";

function DashedLine() {
  return (
    <div className="flex justify-center my-1">
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        <path
          d="M10 5 Q60 35 110 5"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          fill="none"
        />
      </svg>
    </div>
  );
}

function LoveLetters() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/loveletters/")
      .then((res) => setLetters(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans">
      {/* header */}
      <div className="pt-14 pb-6 text-center px-6">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Words 
        </h1>
        <p className="text-sm text-gray-400 mt-1 tracking-wide">
          this page is named love letters in my code i dont know what was i thinking naming it hahahahaha use it as notes app as you like to write
        </p>
      </div>

      {/* add button */}
      <div className="flex justify-center mb-10">
        <Link to="/letters/add">
          <button className="rounded-full bg-gray-800 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-gray-700 transition">
            + Add Note
          </button>
        </Link>
      </div>

      {/* zigzag note cards */}
      <div className="relative max-w-md mx-auto px-8 pb-20">
        {letters.map((letter, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={letter.id}>
              <div
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <div className="w-[75%]">
                  <LoveLetterCard letter={letter} index={index} />
                </div>
              </div>

              {index < letters.length - 1 && (
                <div
                  className={`flex ${
                    isLeft ? "justify-end pr-16" : "justify-start pl-16"
                  }`}
                >
                  <DashedLine />
                </div>
              )}
            </div>
          );
        })}

        {letters.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-10">
            hwwwwww deleted the poem i wrote you are actually evil
          </p>
        )}
      </div>
    </div>
  );
}

export default LoveLetters;