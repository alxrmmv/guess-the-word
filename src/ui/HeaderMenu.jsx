import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useGetCurrentUserQuery } from "../features/authentication/authSlice";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.8rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
  const isAuthenticated = user != null && user?.role === "authenticated";

  return (
    <StyledHeaderMenu>
      {isAuthenticated && (
        <>
          <li>
            <ButtonIcon onClick={() => navigate("/stats")}>
              <Icon>leaderboard</Icon>
            </ButtonIcon>
          </li>
          <li>
            <ButtonIcon onClick={() => navigate("/user")}>
              <Icon>person</Icon>
            </ButtonIcon>
          </li>
        </>
      )}
      {!isAuthenticated && (
        <>
          <li>
            <ButtonIcon onClick={() => navigate("/login")}>
              <Icon>login</Icon>
            </ButtonIcon>
          </li>
        </>
      )}
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
