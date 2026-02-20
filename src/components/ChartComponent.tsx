import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartComponentProps {
  title: string;
  data: ChartDataPoint[];
  color?: string;
  unit?: string;
  type?: "line" | "area";
}

export function ChartComponent({
  title,
  data,
  color = "hsl(187, 80%, 55%)",
  unit = "",
  type = "area",
}: ChartComponentProps) {
  if (!data.length) return null;

  const ChartType = type === "area" ? AreaChart : LineChart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5"
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <ChartType data={data}>
          <defs>
            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(222, 40%, 10%)",
              border: "1px solid hsl(222, 20%, 18%)",
              borderRadius: "12px",
              color: "hsl(210, 40%, 96%)",
              fontSize: 12,
            }}
            formatter={(value: number) => [`${value}${unit}`, title]}
          />
          {type === "area" ? (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${title})`}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          )}
        </ChartType>
      </ResponsiveContainer>
    </motion.div>
  );
}
