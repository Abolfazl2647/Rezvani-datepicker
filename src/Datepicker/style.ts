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
  position: relative;
`;

export const PopOverStyle = styled.div`
  max-width: 260px;
  top: 50px;
  left: 0;
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 0 3px 0 #eaeaea;
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
    &:hover {
      color: white;
      background-color: #68aaf2;
    }

    &.today {
      border-radius: 100%;
      background-color: #f1f1f1;
    }
  }
`;

export const DatepickerTimelineStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30px 1fr 30px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;

  .year-month-picker {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  button {
    ${buttonStyle}

    &.month {
      min-width: auto;
      padding: 0 20px;
    }

    &.year {
      min-width: auto;
      padding: 0 20px;
    }
  }
`;

export const TextfieldWrapperStyle = styled.div`
  display: inline-block;
  position: relative;
  padding: 10px;
  width: auto;
  box-sizing: border-box;
  min-width: 120px;
  height: 50px;
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
