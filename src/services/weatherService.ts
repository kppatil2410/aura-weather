import axios from "axios";
import { WEATHER_API } from "@/config/api";
import type {
  WeatherResponse,
  HistoricalResponse,
  ForecastResponse,
} from "@/types/weather";

// Weatherstack free plan only supports HTTP, but the preview runs on HTTPS.
// We use a CORS proxy to bridge the gap.
const PROXY_URL = "https://api.allorigins.win/raw?url=";

function buildUrl(endpoint: string, params: Record<string, string | number>) {
  const searchParams = new URLSearchParams();
  searchParams.set("access_key", WEATHER_API.ACCESS_KEY);
  for (const [key, val] of Object.entries(params)) {
    searchParams.set(key, String(val));
  }
  const rawUrl = `${WEATHER_API.BASE_URL}${endpoint}?${searchParams.toString()}`;
  return `${PROXY_URL}${encodeURIComponent(rawUrl)}`;
}

function handleApiError(data: any): never {
  if (data?.success === false && data?.error) {
    throw new Error(data.error.info || "Weather API error");
  }
  throw new Error("Unknown API error");
}

export async function getCurrentWeather(city: string): Promise<WeatherResponse> {
  const url = buildUrl("/current", { query: city, units: "m" });
  const { data } = await axios.get(url);
  if (data?.success === false) handleApiError(data);
  return data;
}

export async function getHistoricalWeather(
  city: string,
  date: string
): Promise<HistoricalResponse> {
  const url = buildUrl("/historical", {
    query: city,
    historical_date: date,
    hourly: 1,
    interval: 3,
    units: "m",
  });
  const { data } = await axios.get(url);
  if (data?.success === false) handleApiError(data);
  return data;
}

export async function getHistoricalTimeSeries(
  city: string,
  startDate: string,
  endDate: string
): Promise<HistoricalResponse> {
  const url = buildUrl("/historical", {
    query: city,
    historical_date_start: startDate,
    historical_date_end: endDate,
    hourly: 1,
    units: "m",
  });
  const { data } = await axios.get(url);
  if (data?.success === false) handleApiError(data);
  return data;
}

export async function getForecast(
  city: string,
  days: number = 7
): Promise<ForecastResponse> {
  const url = buildUrl("/forecast", {
    query: city,
    forecast_days: days,
    hourly: 1,
    units: "m",
  });
  const { data } = await axios.get(url);
  if (data?.success === false) handleApiError(data);
  return data;
}
