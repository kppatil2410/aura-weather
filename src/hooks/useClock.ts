import { useState, useEffect } from "react";

interface ClockData {
  time: string;
  seconds: string;
  day: string;
  date: string;
  timezone: string;
  period: string;
}

export function useClock(): ClockData {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const hours = now.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return {
    time: `${String(displayHours).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    seconds: String(now.getSeconds()).padStart(2, "0"),
    day: days[now.getDay()],
    date: `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    period,
  };
}
