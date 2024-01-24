import styled from "styled-components";

const StyledStatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;

  background-color: var(--color-violet-600);
  border-radius: var(--border-radius-xlg);
  border: 1px solid var(--color-grey-700);
`;

const StatsName = styled.p`
  font-size: 2rem;
`;

const StatsValue = styled.p`
  font-size: 2.4rem;
  color: var(--color-main-500);
`;

function StatsRow({ name, value }) {
  return (
    <StyledStatsRow>
      <StatsName>{name}</StatsName>
      <StatsValue>{value}</StatsValue>
    </StyledStatsRow>
  );
}

export default StatsRow;
