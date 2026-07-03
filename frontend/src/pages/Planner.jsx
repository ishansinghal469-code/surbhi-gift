import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DayCard from "../componets/DayCard";
import TaskCard from "../componets/TaskCard";

function Planner() {
  const [days, setDays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("https://surbhi-gift.onrender.com/api/daymanager/"),
      axios.get("https://surbhi-gift.onrender.com/api/tasks/"),
    ])
      .then(([dayResponse, taskResponse]) => {
        setDays(dayResponse.data);
        setTasks(taskResponse.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://surbhi-gift.onrender.com/api/tasks/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
        <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
        <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
            wait bihhhh
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HEADER ── */}
      <div className="relative text-center pt-10 pb-6 px-6">
        <Link
          to="/"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← home
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Planner
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric",
            })}
          </p>
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="flex items-center gap-3 px-5 max-w-2xl mx-auto mb-8">
        <Link
          to="/planner/add-day"
          className="
            flex-1 flex items-center justify-center gap-2 no-underline
            bg-teal-800/30 hover:bg-teal-700/40
            border border-teal-600/30 hover:border-teal-500/50
            text-teal-300 text-[12px] italic tracking-wide
            px-4 py-2.5 rounded-lg transition-all duration-200 font-serif
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          add day schedule
        </Link>

        <Link
          to="/planner/add-task"
          className="
            flex-1 flex items-center justify-center gap-2 no-underline
            bg-teal-800/30 hover:bg-teal-700/40
            border border-teal-600/30 hover:border-teal-500/50
            text-teal-300 text-[12px] italic tracking-wide
            px-4 py-2.5 rounded-lg transition-all duration-200 font-serif
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          add task
        </Link>
      </div>

      <div className="px-5 pb-20 max-w-2xl mx-auto flex flex-col gap-10">

        {/* ── TODAY'S SCHEDULE ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60 m-0">
              today's schedule
            </p>
            <div className="flex-1 h-px bg-teal-500/15" />
            <span className="text-teal-500/40 text-[10px]">
              {days.length} {days.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {days.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-teal-700/20 rounded-xl">
              <p className="text-teal-500/30 text-xl mb-2">✦</p>
              <p className="font-serif italic text-teal-100/25 text-sm">
                 wtfff do something dont waste the day
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {days.map((day) => (
                <DayCard key={day.id} day={day} />
              ))}
            </div>
          )}
        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-teal-500/15" />
          <div className="w-1 h-1 bg-teal-500/30 rotate-45" />
          <div className="flex-1 h-px bg-teal-500/15" />
        </div>

        {/* ── TASKS ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60 m-0">
              tasks
            </p>
            <div className="flex-1 h-px bg-teal-500/15" />
            <span className="text-teal-500/40 text-[10px]">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-teal-700/20 rounded-xl">
              <p className="text-teal-500/30 text-xl mb-2">✦</p>
              <p className="font-serif italic text-teal-100/25 text-sm">
                no tasks huh chill day
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* ── FOOTER ── */}
      <p className="text-center pb-10 italic text-[11px] text-teal-500/30 tracking-wide">
        as you like planning didnt design this page alag coz bohot time lgra tha :(
      </p>

    </div>
  );
}

export default Planner;
