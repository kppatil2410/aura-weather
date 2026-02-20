import { motion } from "framer-motion";
import { useWeather } from "@/hooks/useWeather";
import { DigitalClock } from "@/components/DigitalClock";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { ChartComponent } from "@/components/ChartComponent";
import { SearchBar } from "@/components/SearchBar";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import type { ForecastDay } from "@/types/weather";

const Dashboard = () => {
  const { weather, forecast, loading, error, setCity, refetch } = useWeather();

  const forecastDays: ForecastDay[] = forecast?.forecast
    ? Object.values(forecast.forecast)
    : [];

  // Build chart data from current weather (single point) + forecast hourly
  const tempChartData = weather
    ? [{ label: "Now", value: weather.current.temperature }]
    : [];
  const humidityChartData = weather
    ? [{ label: "Now", value: weather.current.humidity }]
    : [];
  const windChartData = weather
    ? [{ label: "Now", value: weather.current.wind_speed }]
    : [];

  // If forecast available, add hourly data from first day
  if (forecastDays.length > 0 && forecastDays[0].hourly) {
    forecastDays[0].hourly.forEach((h) => {
      const hr = parseInt(h.time) / 100;
      const label = `${hr}:00`;
      tempChartData.push({ label, value: h.temperature });
      humidityChartData.push({ label, value: h.humidity });
      windChartData.push({ label, value: h.wind_speed });
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search */}
      <div className="flex justify-center">
        <SearchBar onSearch={setCity} loading={loading} />
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && weather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Clock + Current Weather */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DigitalClock />
            <div className="lg:col-span-2">
              <WeatherCard data={weather} />
            </div>
          </div>

          {/* 7-Day Forecast */}
          {forecastDays.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                7-Day Forecast
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {forecastDays.map((day, i) => (
                  <ForecastCard key={day.date} day={day} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartComponent
              title="Temperature"
              data={tempChartData}
              color="hsl(187, 80%, 55%)"
              unit="°C"
            />
            <ChartComponent
              title="Humidity"
              data={humidityChartData}
              color="hsl(260, 60%, 55%)"
              unit="%"
            />
            <ChartComponent
              title="Wind Speed"
              data={windChartData}
              color="hsl(150, 60%, 50%)"
              unit=" km/h"
            />
          </div>

          {/* Note about free plan */}
          {forecastDays.length === 0 && (
            <div className="glass rounded-2xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                📊 Forecast and charts with hourly data require a paid Weatherstack plan. 
                Current weather data is displayed above.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
