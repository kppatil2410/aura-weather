import { motion } from "framer-motion";
import { useClock } from "@/hooks/useClock";
import { Clock } from "lucide-react";

export function DigitalClock() {
  const { time, seconds, day, date, timezone, period } = useClock();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 glow-box"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Local Time
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-foreground glow-text">
          {time}
        </span>
        <span className="text-2xl font-mono text-primary">{seconds}</span>
        <span className="text-lg font-medium text-muted-foreground ml-1">{period}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{day}</span>
        <span className="w-1 h-1 rounded-full bg-primary" />
        <span>{date}</span>
        <span className="w-1 h-1 rounded-full bg-primary" />
        <span className="text-xs">{timezone}</span>
      </div>
    </motion.div>
  );
}
