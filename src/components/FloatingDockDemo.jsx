import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Tooltip } from "./Tooltip"; 

export const FloatingDock = ({ items }) => {
  return <OptimizedDock items={items} />;
};

const OptimizedDock = ({ items }) => {
  const mouseY = useMotionValue(Infinity);
  const dockRef = useRef(null);
  
  const [activeHover, setActiveHover] = useState(null);

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="fixed left-4 top-1/2 -translate-y-1/2 hidden w-16 flex-col items-center gap-4 rounded-xl bg-gray-900/95 backdrop-blur-md p-3 shadow-lg border border-gray-700/30 md:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((item, index) => (
        <OptimizedIcon
          key={index}
          mouseY={mouseY}
          index={index}
          item={item}
          isActive={activeHover === index}
          onHoverStart={() => setActiveHover(index)}
          onHoverEnd={() => setActiveHover(null)}
        />
      ))}
    </motion.div>
  );
};

const OptimizedIcon = ({ mouseY, index, item, isActive, onHoverStart, onHoverEnd }) => {
  const ref = useRef(null);
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const scale = useTransform(distance, [-100, 0, 100], [0.9, 1.1, 0.9]);
  const opacity = useTransform(distance, [-100, 0, 100], [0.8, 1, 0.8]);

  return (
    <div 
      className="relative"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <motion.a
        href={item.href}
        className="block p-2 rounded-lg transition-colors hover:bg-gray-800/50"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          ref={ref}
          style={{ scale, opacity }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            {item.icon}
          </div>
        </motion.div>
      </motion.a>

      {isActive && (
        <Tooltip content={item.title} position="right" />
      )}
    </div>
  );
};

export function FloatingDockDemo() {
  const essentialLinks = [
      {
        title: "Artes",
        icon: (
          <img
            src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_arts_and_music.png"
            width={40}
            height={40}
            alt="Artes"
            className="transition-transform duration-300 hover:scale-110"
          />
        ),
        href: "/arte",
      },
     {
      title: "Tecnología",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_engineering_and_tech.png"
          width={40}
          height={40}
          alt="Tecnología"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "Tecno",
    },
    {
      title: "Biología",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_health.png"
          width={40}
          height={40}
          alt="Biología"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "/Biolo",
    },
    {
      title: "Matemáticas",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_math.png"
          width={32}
          height={32}
          alt="Matemáticas"
          loading="lazy"
        />
      ),
      href: "/math",
    },
    {
      title: "CienciaN",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_science.png"
          width={32}
          height={32}
          alt="Ciencia"
          loading="lazy"
        />
      ),
      href: "/CN",
    },
    {
      title: "Ciencias Sociales",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_social_studies.png"
          width={40}
          height={40}
          alt="Ciencias Sociales"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "/CS",
    },
    {
      title: "Lenguaje",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_english.png"
          width={32}
          height={32}
          alt="Lenguaje"
          loading="lazy"
        />
      ),
      href: "/language",
    },
    {
      title: "Mi Progreso",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      ),
      href: "/progress",
    },
  ];

  return (
    <div className="relative h-screen bg-gray-100">
      <FloatingDock items={essentialLinks} />
    </div>
  );
}