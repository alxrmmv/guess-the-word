import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.8rem 1.6rem;
    /* text-transform: uppercase; */
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 700;
  `,
  large: css`
    font-size: 1.6rem;
    /* text-transform: uppercase; */
    padding: 1.2rem 2.4rem;
    font-weight: 700;
  `,
};

const variations = {
  primary: css`
    color: var(--color-grey-900);
    background-color: var(--color-main-500);

    &:hover {
      background-color: var(--color-main-600);
    }
  `,
  secondary: css`
    color: var(--color-grey-50);
    background-color: var(--color-grey-500);
    /* border: 1px solid var(--color-grey-500); */

    &:hover {
      background-color: var(--color-grey-600);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  link: css`
    font-family: inherit;
    background: none;
    border-bottom: 1px solid var(--color-grey-100);
    border-radius: 0%;
    padding: 0 0 2px 0 !important;

    color: var(--color-grey-100);
    cursor: pointer;
    /* text-decoration: underline; */

    &:hover {
      /* color: var(--color-main-500); */
      text-decoration: none;
      border: none;
    }
  `,
};

const Button = styled.button`
  font-family: inherit;
  border: none;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-sm); */

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);

    &:hover {
      background-color: var(--color-grey-300);
      color: var(--color-grey-500);
    }
  }

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.$variation]}
`;

Button.defaultProps = {
  $variation: "primary",
  size: "medium",
};
export default Button;
