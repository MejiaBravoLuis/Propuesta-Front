import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "motion/react";
  
  import { useRef, useState } from "react";
  
  export const FloatingDock = ({ items, desktopClassName }) => {
    return <FloatingDockDesktop items={items} className={desktopClassName} />;
  };
  
  const FloatingDockDesktop = ({ items, className }) => {
    let mouseY = useMotionValue(Infinity);
    return (
      <motion.div
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className={`fixed left-6 top-1/2 -translate-y-1/2 hidden w-20 flex-col items-center gap-4 rounded-2xl bg-gray-50 px-2 py-4 md:flex dark:bg-neutral-900 ${className}`}
      >
        {items.map((item) => (
          <IconContainer mouseY={mouseY} key={item.title} {...item} />
        ))}
      </motion.div>
    );
  };
  
  function IconContainer({ mouseY, title, icon, href }) {
    const ref = useRef(null);
  
    const distance = useTransform(mouseY, (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? {
        y: 0,
        height: 0,
      };
      return val - bounds.y - bounds.height / 2;
    });
  
    const size = useSpring(
      useTransform(distance, [-150, 0, 150], [40, 80, 40]),
      {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
      }
    );
  
    const iconSize = useSpring(
      useTransform(distance, [-150, 0, 150], [20, 40, 20]),
      {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
      }
    );
  
    const [hovered, setHovered] = useState(false);
  
    return (
      <a href={href}>
        <motion.div
          ref={ref}
          style={{ width: size, height: size }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: iconSize, height: iconSize }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
        </motion.div>
      </a>
    );
  }
  