import styled from "@emotion/styled";
import { Theme, css } from "@emotion/react";

const primaryColor = "#3490f4";

interface TextfieldProps extends Theme {
  endAdornment?: boolean;
  startAdornment?: boolean;
}

const buttonStyle = css`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: white;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
`;

export default styled.div`
  display: inline-flex;
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

export const TextfieldWrapperStyle = styled.div`
  display: inline-block;
  position: relative;
  padding: 10px;
  width: auto;
  box-sizing: border-box;
  min-width: 120px;
  border: 1px solid #eaeaea;
  padding-inline-end: 30px;
  padding-inline-start: ${({ startAdornment }: TextfieldProps) =>
    startAdornment ? "30px" : "10px"};

  input {
    border: none;
    outline: none;
    height: 30px;
    width: auto;
    color: ${primaryColor};
  }

  .end-adornment,
  .start-adornment {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    color: ${primaryColor};
    position: absolute;
  }

  .end-adornment {
    right: auto;
  }

  .start-adornment {
    left: auto;
  }
`;
