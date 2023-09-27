import styled from "styled-components";

const MainContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: calc(50vh - 100px) 0px;
  overflow: hidden;
  overflow-y: hidden;
`;

const ScrollerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 15%;
  overflow: hidden;
`;

const TitleContainer = styled.h3`
  text-align: center;
  width: 100%;
  height: 50px;
  margin: 0px;
`;

const Scroller = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
`;

const NumberContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: -${({ margin }) => margin * 50}px 0px 0px;
  transition: margin 0.65s;
`;

const Number = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ selected }) => (selected ? 1 : 0.25)};
  cursor: default;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

const ColonSpan = styled.span`
  margin: 150px 0px 100px;
`;

export {
  MainContainer,
  ScrollerContainer,
  TitleContainer,
  Scroller,
  NumberContainer,
  Number,
  ColonSpan
};
