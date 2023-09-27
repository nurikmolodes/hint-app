import { useState, useEffect } from "react";
import { NumberContainer, Scroller, ScrollerContainer, TitleContainer, Number } from "./styled";

const ScrollerComponent = ({ min, max, value, setValue, title }) => {
  const hoursArray = [];
  for (let hour = min; hour <= max; hour++) {
    if (hour === min) hoursArray.push(" ");
    hoursArray.push(hour);
    if (hour === max) hoursArray.push(" ");
  }

  const [startTouchY, setStartTouchY] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const scrollSpeed = 100; // Adjust the scroll speed here (milliseconds)
  const arr = ['', 'AM', 'PM']
  useEffect(() => {
    if (scrolling) {
      const timer = setTimeout(() => {
        setScrolling(false);
      }, scrollSpeed);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [scrolling]);

  return (
    <ScrollerContainer>
      <TitleContainer>{title}</TitleContainer>
      <Scroller
        onWheel={(e) => {
          if (!scrolling) {
            setScrolling(true);
            const deltaMultiplier = e.deltaY > 0 ? 1 : -1;
            const newValue = Math.min(max, Math.max(min, value + deltaMultiplier));
            setValue(newValue);
          }
        }}
        onTouchStart={(touchStartEvent) => {
          setStartTouchY(touchStartEvent.changedTouches[0].clientY);
        }}
        onTouchMove={(touchMoveEvent) => {
          if (!scrolling) {
            setScrolling(true);
            const touchMoveValue = touchMoveEvent.changedTouches[0].clientY;
            const dTouch = touchMoveValue - startTouchY;
            const deltaMultiplier = dTouch < 0 ? 1 : -1;
            const newValue = Math.min(max, Math.max(min, value + deltaMultiplier));
            setValue(newValue);
          }
        }}>
        <NumberContainer margin={value}>
          {title === "ampm"
            ? arr.map((a, i) => <Number key={a} selected={i === value + 1}>{a}</Number>)
            : hoursArray.length > 1 &&
              hoursArray.map((hour, index) => (
                <Number key={index} selected={index === value + 1}>
                  {hour < 10 && hour !== " " ? `0${hour}` : hour}
                </Number>
              ))}
        </NumberContainer>
      </Scroller>
    </ScrollerContainer>
  );
};

export default ScrollerComponent;
