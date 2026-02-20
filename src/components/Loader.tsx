import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-sm text-muted-foreground">Fetching weather data...</p>
    </motion.div>
  );
}
