export default function ViewToggle({ view, setView }: any) {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <button
        onClick={() => setView("card")}
        className={`px-4 py-2 rounded ${
          view === "card" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        Card
      </button>
      <button
        onClick={() => setView("compact")}
        className={`px-4 py-2 rounded ${
          view === "compact" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        Compact
      </button>
    </div>
  );
}
