"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">NODEPULSE</h1>
      </div>
        <ThemeProvider>
         <ThemeToggle />
         </ThemeProvider>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white dark:bg-black">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 md:py-16">
        <h1 className="text-center text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white md:text-6xl lg:text-7xl max-w-5xl leading-tight">
          {" Master the Metrics. Monitor the Moment."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mt-6 max-w-2xl text-center text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
        >
         Stay in control — track temperature and humidity while managing energy expenses like a pro
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
           <Link href="/dashboard">
              <button className="w-60 transform rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
               Go to Dashboard
               </button>
            </Link>

           <Link href="/dashboard">
             <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
               Contact Us
             </button>
            </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="mt-16 w-full max-w-5xl rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
          <Image
              src="/123.jpg"
              alt="Voice agent preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
             width={1000}
          />
          </div>
        </motion.div>
      </main>
    </div>
  );
}