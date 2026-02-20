import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  Gauge,
  Thermometer,
  Sun,
  Eye,
} from "lucide-react";
import type { WeatherResponse } from "@/types/weather";

interface WeatherCardProps {
  data: WeatherResponse;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { current, location } = data;

  const stats = [
    { icon: Thermometer, label: "Feels Like", value: `${current.feelslike}°C` },
    { icon: Droplets, label: "Humidity", value: `${current.humidity}%` },
    { icon: Wind, label: "Wind", value: `${current.wind_speed} km/h` },
    { icon: Gauge, label: "Pressure", value: `${current.pressure} mb` },
    { icon: Sun, label: "UV Index", value: `${current.uv_index}` },
    { icon: Eye, label: "Visibility", value: `${current.visibility} km` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass rounded-2xl p-6 glow-box"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Main temp */}
        <div className="flex items-center gap-5">
          {current.weather_icons?.[0] && (
            <motion.img
              src={current.weather_icons[0]}
              alt={current.weather_descriptions?.[0] || "weather"}
              className="w-20 h-20 drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              {current.temperature}
              <span className="text-2xl text-primary">°C</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-1">
              {current.weather_descriptions?.[0]}
            </p>
            <p className="text-sm text-muted-foreground">
              {location.name}, {location.country}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/30"
            >
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-sm font-semibold text-foreground">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
