import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp, onExpire, className }) {
  const {
    seconds,
    minutes
  } = useTimer({ expiryTimestamp, onExpire });


  return (
    <div className={className}>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}