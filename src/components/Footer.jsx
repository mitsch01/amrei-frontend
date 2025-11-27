import { useState, useEffect } from "react";

export default function Footer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Prüfen, ob wir auf einem Touch-Gerät sind
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTogglePlay = () => {
    if (isMobile) setIsPlaying((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsPlaying(false);
  };

  return (
    <footer className="mt-12 bg-[#80B9BF] h-48 relative">
      <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white mx-auto h-full relative">

        {/* Animation */}
        <div
          className="absolute bottom-64 left-0 -rotate-16 cursor-pointer"
          onClick={handleTogglePlay}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop: Hover → GIF */}
          {!isMobile && (
            <img
              src={isPlaying ? "/images/Animation-Sitting.gif" : "/images/Animation-Sitting.png"}
              alt="Sitting animation"
              className="w-[10%] md:w-[15%] hover:opacity-100"
            />
          )}

          {/* Mobile: Tap → GIF / sonst statisch */}
          {isMobile && (
            <img
              src={isPlaying ? "/images/Animation-Sitting.gif" : "/images/Animation-Sitting.png"}
              alt="Sitting animation"
              className="w-[10%] md:w-[15%]"
            />
          )}
        </div>

        {/* Footer Links */}
        <div className="text-sm md:text-right md:ml-auto">
          <a className="block" href="/datenschutz">Datenschutz</a>
          <a className="block" href="/impressum">Impressum</a>
          <div className="mt-4 text-xl">
            <a href="https://www.instagram.com/amreifiedler" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}