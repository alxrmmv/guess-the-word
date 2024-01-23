import styled from "styled-components";

const ButtonIcon = styled.button`
  /* font-size: 24px; */
  color: var(--color-grey-50);

  line-height: 1;
  background: none;
  border: none;

  display: inline-block;
  text-align: center;
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-violet-600);
    cursor: pointer;
  }

  /* & svg {
    color: var(--color-violet-50);
    height: 2rem;
    width: 2rem;
  } */
`;

// const Icon = styled.span`
//   color: var(--color-violet-50);
//   font-family: "Material Icons";
//   font-weight: normal;
//   font-style: normal;
//   /* Preferred icon size */
//   display: inline-block;
//   line-height: 1;
//   text-transform: none;
//   letter-spacing: normal;
//   word-wrap: normal;
//   white-space: nowrap;
//   direction: ltr;
// `;

// function ButtonIcon({ children }) {
//   return (
//     <StyledButtonIcon>
//       <Icon>{children}</Icon>
//     </StyledButtonIcon>
//   );
// }

export default ButtonIcon;
