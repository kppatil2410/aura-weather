import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartComponent } from "@/components/ChartComponent";
import { SearchBar } from "@/components/SearchBar";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { getHistoricalWeather } from "@/services/weatherService";
import type { HistoricalDay } from "@/types/weather";

const Historical = () => {
  const [city, setCity] = useState("Bengaluru");
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HistoricalDay | null>(null);

  const fetchData = async () => {
    if (!date) return;
    setLoading(true);
    setError(null);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const res = await getHistoricalWeather(city, dateStr);
      const days = Object.values(res.historical);
      if (days.length > 0) {
        setData(days[0]);
      } else {
        setError("No historical data found for this date.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch historical data");
    } finally {
      setLoading(false);
    }
  };

  const hourlyTempData = data?.hourly?.map((h) => ({
    label: `${parseInt(h.time) / 100}:00`,
    value: h.temperature,
  })) || [];

  const hourlyHumidityData = data?.hourly?.map((h) => ({
    label: `${parseInt(h.time) / 100}:00`,
    value: h.humidity,
  })) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Historical Weather</h1>
        <p className="text-muted-foreground text-sm">
          Select a city and date to explore past weather data
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <SearchBar onSearch={setCity} loading={loading} />
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal bg-card/60 backdrop-blur-xl border-white/[0.08]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d > new Date() || d < new Date("2015-01-01")}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={fetchData}
            disabled={!date || loading}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            Fetch
          </Button>
        </div>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Min Temp", value: `${data.mintemp}°C` },
              { label: "Max Temp", value: `${data.maxtemp}°C` },
              { label: "Avg Temp", value: `${data.avgtemp}°C` },
              { label: "UV Index", value: `${data.uv_index}` },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Hourly charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartComponent
              title="Hourly Temperature"
              data={hourlyTempData}
              color="hsl(187, 80%, 55%)"
              unit="°C"
            />
            <ChartComponent
              title="Hourly Humidity"
              data={hourlyHumidityData}
              color="hsl(260, 60%, 55%)"
              unit="%"
            />
          </div>
        </motion.div>
      )}

      {!data && !loading && !error && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-muted-foreground text-sm">
            ⚠️ Historical data requires a paid Weatherstack plan. Select a date and try fetching to check availability.
          </p>
        </div>
      )}
    </div>
  );
};

export default Historical;
