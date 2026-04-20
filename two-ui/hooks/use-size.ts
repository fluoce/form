import { useState, useEffect } from "react";

export function useSize(width: number): boolean {
  const getMatch = () =>
    typeof window !== "undefined" && window.innerWidth <= width;

  const [isMatched, setIsMatched] = useState(getMatch);

  useEffect(() => {
    function handleResize() {
      setIsMatched(getMatch());
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return isMatched;
}
