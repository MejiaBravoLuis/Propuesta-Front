import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, className }) => {
  return <EnhancedFloatingDock items={items} className={className} />;
};

const EnhancedFloatingDock = ({ items, className }) => {
  const mouseY = useMotionValue(Infinity);
  const [activeIndex, setActiveIndex] = useState(null);
  const dockRef = useRef(null);

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => {
        mouseY.set(Infinity);
        setActiveIndex(null);
      }}
      className={`fixed left-6 top-1/2 -translate-y-1/2 hidden w-20 flex-col items-center gap-6 rounded-2xl bg-gray-800/90 backdrop-blur-lg p-4 shadow-xl border border-gray-700/50 md:flex ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {items.map((item, index) => (
        <EnhancedIconContainer 
          key={item.title}
          mouseY={mouseY}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function EnhancedIconContainer({ mouseY, title, icon, href, index, activeIndex, setActiveIndex }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const size = useSpring(
    useTransform(distance, [-150, 0, 150], [50, 50, 50], {
      clamp: true
    }), 
    {
      mass: 0.1,
      stiffness: 200,
      damping: 15,
    }
  );

  const scale = useSpring(
    useTransform(distance, [-150, 0, 150], [0.8, 1.2, 0.8]), 
    {
      mass: 0.2,
      stiffness: 150,
      damping: 10,
    }
  );

  const opacity = useTransform(distance, [-150, -50, 0, 50, 150], [0.6, 0.8, 1, 0.8, 0.6]);

  const yOffset = useSpring(
    useTransform(distance, [-150, 0, 150], [10, 0, 10]), 
    {
      stiffness: 200,
      damping: 15,
    }
  );

  const glowColor = index === activeIndex ? "rgba(234, 179, 8, 0.3)" : "rgba(255, 255, 255, 0.1)";

  return (
    <motion.a
      href={href}
      className="relative flex items-center justify-center"
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveIndex(index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveIndex(null);
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size,
          scale,
          opacity,
          y: yOffset,
        }}
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg"
        animate={{
          boxShadow: isHovered 
            ? `0 0 0 3px rgba(234, 179, 8, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.3)`
            : `0 0 0 1px rgba(255, 255, 255, 0.05), 0 5px 15px -5px rgba(0, 0, 0, 0.2)`
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: glowColor,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="flex items-center justify-center"
          style={{
            width: "60%",
            height: "60%",
          }}
          whileHover={{ scale: 1.1 }}
        >
          {icon}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 15 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-full ml-4 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-lg border border-gray-700"
          >
            {title}
            <motion.div 
              className="absolute left-0 top-1/2 w-2 h-2 -translate-x-1 -translate-y-1/2 bg-gray-900 rotate-45 border-l border-t border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export function FloatingDockDemo() {
  const links = [
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_arts_and_music.png"
          width={40}
          height={40}
          alt="Artes"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_science.png"
          width={40}
          height={40}
          alt="Ciencia"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_engineering_and_tech.png"
          width={40}
          height={40}
          alt="Tecnología"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_health.png"
          width={40}
          height={40}
          alt="Biología"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_english.png"
          width={40}
          height={40}
          alt="Lenguaje"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_social_studies.png"
          width={40}
          height={40}
          alt="Ciencias Sociales"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
    {
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_math.png"
          width={40}
          height={40}
          alt="Matemáticas"
          className="transition-transform duration-300 hover:scale-110"
        />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <FloatingDock items={links} />
    </div>
  );
}