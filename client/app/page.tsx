"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";

/* ---------- Navbar ---------- */
const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b border-emerald-200 bg-white/70 px-6 py-4 backdrop-blur dark:border-emerald-900 dark:bg-black/60">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-emerald-500 to-lime-400 shadow-md" />
        <h1 className="text-xl font-bold tracking-wide text-emerald-700 dark:text-emerald-400">
          GREENPULSE
        </h1>
      </div>

      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    </nav>
  );
};

/* ---------- Feature Card ---------- */
const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-neutral-900"
  >
    <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
      {title}
    </h3>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
      {description}
    </p>
  </motion.div>
);

/* ---------- Home ---------- */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 via-white to-white dark:from-black dark:to-black">
      <Navbar />

      <main className="flex flex-1 flex-col items-center px-6 py-16">
        {/* ---------- Animated Heading ---------- */}
        <h1 className="max-w-5xl text-center text-4xl font-extrabold leading-tight text-emerald-800 dark:text-white md:text-6xl lg:text-7xl">
          {"Grow Smart. Automate Nature. Monitor Everything."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* ---------- Subtitle ---------- */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 max-w-2xl text-center text-lg text-emerald-700 dark:text-emerald-300 md:text-xl"
        >
          A smart greenhouse platform that continuously monitors crops,
          automates irrigation and climate control, and helps farmers make
          data-driven decisions.
        </motion.p>

        {/* ---------- Live Status Strip ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: "Temperature", value: "26°C Optimal" },
            { label: "Soil Moisture", value: "62% Stable" },
            { label: "Irrigation", value: "Auto Enabled" },
            { label: "System Status", value: "All Sensors Active" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
            >
              <span className="block text-xs opacity-70">{item.label}</span>
              {item.value}
            </div>
          ))}
        </motion.div>

        {/* ---------- CTA Buttons ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <Link href="/dashboard">
            <button className="w-64 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              Open Control Dashboard
            </button>
          </Link>

          <Link href="/contact">
            <button className="w-64 rounded-xl border border-emerald-300 bg-white px-6 py-3 font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-50 dark:border-emerald-700 dark:bg-black dark:text-emerald-300 dark:hover:bg-emerald-950">
              Learn More
            </button>
          </Link>
        </motion.div>

        {/* ---------- Feature Grid (Image Replacement) ---------- */}
        <div className="mt-24 grid max-w-6xl gap-6 md:grid-cols-3">
          <FeatureCard
            title="Smart Irrigation Control"
            description="Automatically adjusts water supply based on soil moisture, crop stage, and climate conditions."
          />
          <FeatureCard
            title="Real-Time Crop Monitoring"
            description="Continuously tracks temperature, humidity, light, and crop health using IoT sensors."
          />
          <FeatureCard
            title="Data-Driven Insights"
            description="Visual dashboards and analytics help farmers optimize yield while reducing water and energy waste."
          />
        </div>
      </main>
    </div>
  );
}
