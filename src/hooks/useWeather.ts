import { useState, useEffect, useCallback } from "react";
import { getCurrentWeather, getForecast } from "@/services/weatherService";
import type { WeatherResponse, ForecastResponse } from "@/types/weather";

interface UseWeatherReturn {
  weather: WeatherResponse | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: string | null;
  city: string;
  setCity: (city: string) => void;
  refetch: () => void;
}

export function useWeather(initialCity: string = "Bengaluru"): UseWeatherReturn {
  const [city, setCity] = useState(initialCity);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.allSettled([
        getCurrentWeather(city),
        getForecast(city, 7),
      ]);

      if (weatherData.status === "fulfilled") {
        setWeather(weatherData.value);
      } else {
        throw new Error(weatherData.reason?.message || "Failed to fetch weather");
      }

      if (forecastData.status === "fulfilled") {
        setForecast(forecastData.value);
      }
      // Forecast may fail on free plan — that's okay
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, forecast, loading, error, city, setCity, refetch: fetchWeather };
}
