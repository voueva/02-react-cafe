import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
import { useState } from 'react';
import type { VotesState, VoteType } from '../../types/votes';

const defaultState: VotesState = {
  good: 0,
  neutral: 0,
  bad: 0
};

function App() {
  const [votes, setVotes] = useState(defaultState);

  function handleVote(type: VoteType): void {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  }

  function resetVotes(): void {
    setVotes(defaultState);
  }

  const canReset = votes.good > 0 || votes.neutral > 0 || votes.bad > 0;

  const totalVotes = votes.bad + votes.neutral + votes.good;

  const positiveRate = totalVotes
      ? Math.round((votes.good / totalVotes) * 100)
      : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={canReset} />
      {totalVotes > 0 && <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />}
      {totalVotes === 0 && <Notification />}
    </div>
  );
}

export default App;
