import { useState, useEffect } from "react";

const useScrollDirection = (initialValue: string) => {
  const [scrollDirection, setScrollDirection] = useState(initialValue);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
    
  }, [scrollDirection]); // 여기서 scrollDirection을 의존성으로 사용하지 않습니다.

  return scrollDirection; // setScrollDirection 함수를 반환하지 않고, 상태만 반환합니다.
};

export default useScrollDirection;
