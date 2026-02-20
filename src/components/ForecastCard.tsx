import { motion } from "framer-motion";
import type { ForecastDay } from "@/types/weather";

interface ForecastCardProps {
  day: ForecastDay;
  index: number;
}

export function ForecastCard({ day, index }: ForecastCardProps) {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString("en", { weekday: "short" });
  const dateStr = date.toLocaleDateString("en", { month: "short", day: "numeric" });
  const icon = day.hourly?.[4]?.weather_icons?.[0] || day.hourly?.[0]?.weather_icons?.[0];
  const desc = day.hourly?.[4]?.weather_descriptions?.[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-hover rounded-2xl p-5 min-w-[140px] flex flex-col items-center gap-3 cursor-default"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        {dayName}
      </span>
      <span className="text-xs text-muted-foreground">{dateStr}</span>
      {icon && (
        <img src={icon} alt={desc} className="w-12 h-12 drop-shadow-lg" />
      )}
      <p className="text-xs text-muted-foreground text-center">{desc}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-foreground">{day.maxtemp}°</span>
        <span className="text-sm text-muted-foreground">{day.mintemp}°</span>
      </div>
    </motion.div>
  );
}
