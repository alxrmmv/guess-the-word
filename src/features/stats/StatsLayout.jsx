import styled from "styled-components";
import { useGetStatsQuery } from "./statsSlice";
import StatsRow from "./StatsRow";
import { formatPercent } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import ErrorMessage from "../../ui/ErrorMessage";

const StyledStatsLayout = styled.div`
  margin: 2.4rem 1.2rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
`;

function StatsLayout() {
  const { data: stats, isLoading, isError, error } = useGetStatsQuery();

  if (isLoading) return <Spinner />;
  if (isError) {
    console.error(error);
    return <ErrorMessage>{"Ups, something went wrong 😕"}</ErrorMessage>;
  }

  return (
    <StyledStatsLayout>
      <StatsRow name="Games played" value={stats.gamesNumber}></StatsRow>
      <StatsRow
        name="Success rate"
        value={formatPercent(stats.successRate)}
      ></StatsRow>
      <StatsRow
        name="Average moves"
        value={stats.avgMoves.toFixed(1)}
      ></StatsRow>
      <StatsRow name="Best streak" value={stats.bestStreak}></StatsRow>
      <StatsRow name="Current streak" value={stats.currentStreak}></StatsRow>
    </StyledStatsLayout>
  );
}

export default StatsLayout;
