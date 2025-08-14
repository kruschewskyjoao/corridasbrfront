"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 opacity-80" />
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="grid gap-6 lg:grid-cols-2 min-h-[80vh] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Descubra Corridas e Trilhas de Aventura Épicas
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                Conecte-se com outros aventureiros, descubra novas trilhas e compartilhe suas rotas de corrida favoritas. Crie listagens detalhadas
                com fotos para ajudar outras pessoas a encontrarem sua próxima grande aventura.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ScrollLink
                to="aventuras-destaque"
                smooth={true}
                duration={500}
                spy={true}
                offset={-70}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Explorar Trilhas
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </ScrollLink>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="hidden lg:block">
            <Image
              src="/hero-run.jpg"
              width={600}
              height={600}
              alt="Hero"
              className="mx-auto rounded-xl object-cover shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        variants={itemVariants}
      >
        <ScrollLink
          to="features"
          smooth={true}
          duration={500}
          spy={true}
          offset={-70}
          className="inline-block cursor-pointer p-4"
        >
          <svg
            className="w-8 h-8 text-gray-500 dark:text-gray-400 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </ScrollLink>
      </motion.div>
    </section>
  );
}
