import { useState, useEffect } from "react";

const useScrollDirection = (initialValue: string) => {
  // 스크롤 방향
  // 네브바 초기 설정에 필요한 initialValue ("up" 또는 "down")
  const [scrollDirection, setScrollDirection] = useState(initialValue);

  useEffect(() => {
    let lastScrollY = window.pageYOffset; // 현재 스크롤 위치
    
    /** 스크롤 방향을 업데이트 하는 함수 */
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset; // 현재 스크롤 위치
      // 이전 위치랑 비교해 방향 알아내기
      const direction = scrollY > lastScrollY ? "down" : "up"; 
      
      // 스크롤 방향이 바뀐 경우에 setState로 업데이트
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0; // 이전 위치 업뎃
    };
    
    
    // 이벤트 리스너 등록
    window.addEventListener("scroll", updateScrollDirection); 
    
    // 이벤트 리스너 삭제 (clean up)
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); 
    };
    
  }, [scrollDirection]);

  return [scrollDirection, setScrollDirection];
};

export default useScrollDirection;