import styled, { css } from "styled-components";

const types = {
  game: css`
    font-size: 3.2rem;
    color: var(--color-grey-50);
    border: 1px solid var(--color-main-500);
    flex-grow: 1;

    width: 100%;
    display: inline-flex;
    border-radius: var(--border-radius-md);

    &::before {
      content: "";
      display: inline-block;
      padding-bottom: 100%;
    }
  `,

  keyboard: css`
    height: 70%;
    width: auto;
    aspect-ratio: 3/4;
    font-size: 1.6rem;
    border-radius: var(--border-radius-md);

    border: 1px solid var(--color-grey-500);
    cursor: pointer;

    @media screen and (min-width: 400px) and (min-height: 700px) {
      font-size: 1.8rem;
    }

    @media screen and (min-width: 600px) and (min-height: 1080px) {
      font-size: 2rem;
    }
  `,
};

const statuses = {
  correct: css`
    color: var(--color-grey-900);
    background-color: var(--color-main-500);
    border-color: var(--color-main-500);
  `,

  exists: css`
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-color: var(--color-grey-50);
  `,

  wrong: css`
    color: var(--color-grey-50);
    background-color: var(--color-grey-500);
    border-color: var(--color-grey-500);
  `,

  error: css`
    color: var(--color-red-500);
  `,
};

const Letter = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 1;
  text-transform: uppercase;
  background: none;
  color: var(--color-grey-50);

  ${(props) => types[props.type]}
  ${(props) => statuses[props.$status]}
`;

Letter.defaultProps = {
  type: "game",
  $status: "",
};

export default Letter;
