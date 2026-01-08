//dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

// helper
const formatTime = (ms) => {
  if (ms <= 0) return "0h : 00m : 00s";
  const totalSec = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return `${pad(hrs)}h : ${pad(mins)}m : ${pad(secs)}s`;
};

export default function Dashboard() {
  const [status, setStatus] = useState("OFFLINE");
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(Date.now());

  // live clock
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ───────────────── EVENTS ─────────────────
  const addEvent = (type) => {
    setEvents((prev) => [...prev, { type, time: Date.now() }]);
  };

  const punchIn = () => {
    if (status !== "OFFLINE") return;
    addEvent("PUNCH_IN");
    setStatus("ONLINE");
  };

  const startBreak = () => {
    if (status !== "ONLINE") return;
    addEvent("BREAK_START");
    setStatus("ON_BREAK");
  };

  const endBreak = () => {
    if (status !== "ON_BREAK") return;
    addEvent("BREAK_END");
    setStatus("ONLINE");
  };

  const punchOut = () => {
    if (status === "OFFLINE") return;
    addEvent("PUNCH_OUT");
    setStatus("OFFLINE");
  };

  const resetDay = () => {
    if (!window.confirm("This will reset all today's data. Continue?")) return;
    setEvents([]);
    setStatus("OFFLINE");
  };

  // ───────────────── CALCULATIONS ─────────────────
  let totalTime = 0;
  let breakTime = 0;

  let punchInTime = null;
  let breakStart = null;

  events.forEach((e) => {
    if (e.type === "PUNCH_IN") punchInTime = e.time;

    if (e.type === "BREAK_START") breakStart = e.time;

    if (e.type === "BREAK_END" && breakStart) {
      breakTime += e.time - breakStart;
      breakStart = null;
    }

    if (e.type === "PUNCH_OUT" && punchInTime) {
      totalTime += e.time - punchInTime;
      punchInTime = null;
    }
  });

  // live running time
  if (status !== "OFFLINE" && punchInTime) {
    totalTime += now - punchInTime;
  }

  if (status === "ON_BREAK" && breakStart) {
    breakTime += now - breakStart;
  }

  const productiveTime = totalTime - breakTime;

  // ───────────────── UI ─────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col pr-6">
        <Topbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Welcome, Harshit!</h1>
              <p className="text-gray-500 text-sm">
                Enjoy tracking your work hours
              </p>
            </div>

            <div className="flex gap-3">
              {status === "OFFLINE" && (
                <button
                  onClick={punchIn}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Punch In
                </button>
              )}

              {status === "ONLINE" && (
                <>
                  <button
                    onClick={startBreak}
                    className="bg-red-400 text-white px-4 py-2 rounded-lg"
                  >
                    Break
                  </button>
                  <button
                    onClick={punchOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Punch Out
                  </button>
                </>
              )}

              {status === "ON_BREAK" && (
                <button
                  onClick={endBreak}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  End Break
                </button>
              )}

              <button
                onClick={resetDay}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Hours" value={formatTime(totalTime)} />
            <StatCard title="Break Time" value={formatTime(breakTime)} />
            <StatCard
              title="Status"
              value={
                status === "ONLINE"
                  ? "Online"
                  : status === "ON_BREAK"
                  ? "On Break"
                  : "Offline"
              }
              status
            />
            <StatCard title="AHT" value="12m" />
            <StatCard title="CHT" value="Live" />
            <StatCard title="Productive" value={formatTime(productiveTime)} />
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Activity</h2>

            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Chart will come here
            </div>

            <div className="grid grid-cols-3 text-center mt-4 text-sm">
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">{formatTime(totalTime)}</p>
              </div>
              <div>
                <p className="text-gray-500">Break</p>
                <p className="font-semibold">{formatTime(breakTime)}</p>
              </div>
              <div>
                <p className="text-gray-500">Productive</p>
                <p className="font-semibold">{formatTime(productiveTime)}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
