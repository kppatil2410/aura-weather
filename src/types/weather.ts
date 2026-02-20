export interface WeatherLocation {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface CurrentWeather {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface WeatherResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: WeatherLocation;
  current: CurrentWeather;
}

export interface HourlyData {
  time: string;
  temperature: number;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  precip: number;
  humidity: number;
  visibility: number;
  pressure: number;
  cloudcover: number;
  heatindex: number;
  dewpoint: number;
  windchill: number;
  windgust: number;
  feelslike: number;
  chanceofrain: number;
  chanceofremdry: number;
  chanceofwindy: number;
  chanceofovercast: number;
  chanceofsunshine: number;
  chanceoffrost: number;
  chanceofhightemp: number;
  chanceoffog: number;
  chanceofsnow: number;
  chanceofthunder: number;
  uv_index: number;
}

export interface HistoricalDay {
  date: string;
  date_epoch: number;
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
  };
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyData[];
}

export interface HistoricalResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: WeatherLocation;
  current: CurrentWeather;
  historical: Record<string, HistoricalDay>;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
  };
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyData[];
}

export interface ForecastResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: Record<string, ForecastDay>;
}

export interface WeatherError {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
