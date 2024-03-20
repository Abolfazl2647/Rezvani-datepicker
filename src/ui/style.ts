import styled from "@emotion/styled";

export default styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  .days-name-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .days-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;
