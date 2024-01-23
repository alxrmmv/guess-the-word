import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkButton = styled(Link)`
  color: var(--color-main-500);
  text-decoration: none;
  &:hover {
    color: var(--color-main-600);
  }
`;

export default LinkButton;
