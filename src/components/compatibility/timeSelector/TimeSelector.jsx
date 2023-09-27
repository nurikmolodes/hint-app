import { useState } from "react";
import ScrollerComponent from "./scroller";
import { ColonSpan, MainContainer } from "./styled";

export default function TimeSelector() {
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState(1);
  const [selectedSecond, setSelectedSecond] = useState(1);
  console.log(selectedHour, selectedMinute, selectedSecond);

  return (
    <MainContainer>
      <ScrollerComponent
        min={0}
        max={12}
        value={selectedHour}
        setValue={setSelectedHour}
        title="Hour"
      />
      <ScrollerComponent
        min={0}
        max={59}
        value={selectedMinute}
        setValue={setSelectedMinute}
        title="Minute"
      />
      <ScrollerComponent
        min={0}
        max={1}
        value={selectedSecond}
        setValue={setSelectedSecond}
        title="ampm"
      />
      <span>{selectedHour},</span>
      <span>{selectedMinute},</span>
      <span>{selectedSecond === 0 ? 'AM' : 'PM'}</span>
    </MainContainer>
  );
}
