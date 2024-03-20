import styled from "@emotion/styled";
import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: white;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border: 1px solid #3490f4;
  color: #3490f4;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
`;

export default styled.div`
  max-width: 260px;
  box-shadow: 0 0 10px 1px #dedede;
`;

export const DaysWrapperStyle = styled.div`
  display: grid;
  max-width: auto;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  border-radius: 3px;

  .day {
    ${buttonStyle}
  }
`;

export const DatepickerTimelineStyle = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;

  button {
    ${buttonStyle}
  }
`;
