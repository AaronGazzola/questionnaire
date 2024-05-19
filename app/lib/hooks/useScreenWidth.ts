import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isSm, setIsSm] = useState<boolean>(false);
  const [isMd, setIsMd] = useState<boolean>(false);
  const [isLg, setIsLg] = useState<boolean>(false);
  const [isXl, setIsXl] = useState<boolean>(false);
  const [is2xl, setIs2xl] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsSm(width >= breakpoints.sm);
      setIsMd(width >= breakpoints.md);
      setIsLg(width >= breakpoints.lg);
      setIsXl(width >= breakpoints.xl);
      setIs2xl(width >= breakpoints["2xl"]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenWidth, isSm, isMd, isLg, isXl, is2xl };
};

export default useScreenWidth;
