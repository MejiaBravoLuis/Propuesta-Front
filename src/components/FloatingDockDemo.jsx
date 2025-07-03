import React from "react";
import { FloatingDock } from "../ui/floating-dock";


export function FloatingDockDemo() {
  const links = [
    {
      title: "Artes",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_arts_and_music.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Ciencia",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_science.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Tecnologia",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_engineering_and_tech.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Biologia",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_health.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Lenguaje",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_english.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Ciencia Sociales",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_social_studies.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
    {
      title: "Matematica",
      icon: (
        <img
          src="https://static.brainpop.com/images/nuxt/brainpop/categories/animated_math.png"
          width={40}
          height={40}
          alt="Ciencia"
        />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <FloatingDock items={links} />
    </div>
  );
}
