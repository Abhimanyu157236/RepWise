export const MacroBar = ({ label, value, goal, color }) => {
  const percent = (value / goal) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm text-white/60 mb-1">
        <span>{label}</span>
        <span>
          {value}/{goal} {label === "Calories" ? "Kcal" : "g"}
        </span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
};
