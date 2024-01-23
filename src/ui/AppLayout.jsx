import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  /* width: 100%; */
  background-color: var(--color-violet-800);

  max-width: 80rem;
  margin: auto;
`;

// const Main = styled.main`
//   /* height: 100vh; */
//   /* background-color: var(--color-violet-800); */
//   /* background-color: var(--color-violet-800); */
//   /* height: 100%; */

//   /* padding: 1.2rem; */
// `;

const Container = styled.main`
  /* display: flex; */
  width: 100%;
  height: 100%;
  max-width: 60rem;
  margin: 0 auto;

  /* display: flex; */
  /* flex-direction: column; */
  /* height: 100%; */
`;

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   padding: 2.4rem;

//   /* flex-direction: column;
//   gap: 3.2rem; */

// `;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      {/* <Main> */}
      <Container>
        <Outlet />
      </Container>
      {/* </Main> */}
    </StyledAppLayout>
  );
}

export default AppLayout;
