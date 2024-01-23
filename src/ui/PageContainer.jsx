import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";

const StyledPageContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  /* row-gap: 1.2rem; */

  background-color: var(--color-violet-700);
  border-top-left-radius: var(--border-radius-xlg);
  border-top-right-radius: var(--border-radius-xlg);
  border: 1px solid var(--color-grey-700);
  border-bottom: none;
`;

const CloseButtonContainer = styled.div`
  padding: 0.8rem 0.8rem 0 0;
  grid-column: -2;
`;

const ContentContainer = styled.div`
  grid-column: 1/-1;
  /* margin-top: 1.2rem; */
  /* padding: 1.2rem; */
  /* grid-row: 2; */
`;

const HeaderContainer = styled.div`
  grid-column: 1/-1;
  text-align: center;
`;

function PageContainer({ title, children }) {
  const navigate = useNavigate();
  return (
    <StyledPageContainer>
      <CloseButtonContainer>
        <ButtonIcon onClick={() => navigate("/")}>
          <Icon>close</Icon>
        </ButtonIcon>
      </CloseButtonContainer>
      <HeaderContainer>
        <Heading as="h1">{title}</Heading>
      </HeaderContainer>
      <ContentContainer>{children}</ContentContainer>
    </StyledPageContainer>
  );
}

export default PageContainer;
