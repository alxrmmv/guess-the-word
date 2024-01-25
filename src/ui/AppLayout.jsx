import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  height: 100vh;
  height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: var(--color-violet-800);

  max-width: 80rem;
  margin: auto;
`;

const Container = styled.main`
  width: 100%;
  height: 100%;
  max-width: 60rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </StyledAppLayout>
  );
}

export default AppLayout;
