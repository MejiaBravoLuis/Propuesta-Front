import { useEffect } from "react";

const useNarrador = (texto, delay = 500) => {
  useEffect(() => {
    const narrar = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-ES';
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    };
    const timer = setTimeout(narrar, delay);
    return () => clearTimeout(timer);
  }, [texto]);
};

export default useNarrador;
