import styled from "@emotion/styled";
import { Theme, css } from "@emotion/react";

const primaryColor = "#3490f4";

interface TextfieldProps extends Theme {
  endAdornment?: boolean;
  startAdornment?: boolean;
}

const buttonStyle = css`
  cursor: pointer;
  min-width: 30px;
  height: 30px;
  background: white;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  outline: none;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default styled.div`
  display: inline-flex;
  position: relative;
  font-family: tahoma;
`;

export const PopOverStyle = styled.div`
  max-width: 260px;
  top: 50px;
  left: 0;
  z-index: 10;
  position: absolute;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #eaeaea;
`;

export const DaysWrapperStyle = styled.div`
  display: grid;
  max-width: auto;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  border-radius: 5px;

  .day {
    ${buttonStyle}
    border-color: #68aaf2;
    opacity: 0.7;

    &.active-month {
      opacity: 1;
      color: ${primaryColor};
      border-color: ${primaryColor};
    }

    &.today {
      border-radius: 5px;
      background-color: #f1f1f1;
    }

    &.selected {
      color: white;
      background-color: #68aaf2;
    }

    &:hover {
      color: white;
      background-color: #68aaf2;
    }
  }
`;

export const DatepickerTimelineStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 35px 35px;
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  justify-content: space-between;

  button.btn {
    ${buttonStyle}

    &.prev-month, 
    &.next-month {
      max-width: 30px;
    }
  }

  .year-month-picker {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      min-width: auto;

      &.month {
        min-width: auto;
        padding: 0 30px;
        margin-inline: 5px;
      }

      &.year {
        min-width: auto;
        padding: 0 20px;
        max-width: 40px;
        margin-inline: 5px;
      }
    }
  }
`;

export const TimelineStyle = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 100;
  box-sizing: border-box;
  background-color: #f1f1f1;
  overflow-y: auto;

  .timeline-head {
    top: 0;
    font-size: 20px;
    width: 100%;
    display: flex;
    padding: 10px;
    min-height: 30px;
    position: sticky;
    align-items: center;
    flex-direction: row;
    margin-bottom: 2px;
    box-sizing: border-box;
    background-color: white;
    justify-content: space-between;

    button {
      width: 30px;
      height: 30px;
      font-size: 25px;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      color: #68aaf2;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .year-wrapper {
    padding: 5px 5px;

    .year-row {
      width: 100%;
      display: block;
      box-sizing: border-box;

      &.open {
        border: 2px solid ${primaryColor};
        border-radius: 5px;
      }

      button {
        cursor: pointer;
        width: 100%;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
        text-align: left;
        padding: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
        margin-bottom: 2px;
        box-sizing: border-box;
        border: none;
        outline: none;
      }

      .month-wrapper {
        display: grid;
        grid-column-gap: 2px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);

        .month {
          cursor: pointer;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
      }
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

    button {
      ${buttonStyle}
      border: none;
      font-size: 18px;
      background: none;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .end-adornment {
    right: auto;
  }

  .start-adornment {
    left: auto;
  }
`;

export const DatePickerActionsStyle = styled.div``;
