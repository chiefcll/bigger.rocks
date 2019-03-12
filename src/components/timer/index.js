import React from 'react';
import { useStopwatch  } from 'react-timer-hook';

const MAX_TIME = 301;

function MyStopwatch({onTick}) {
  let {
    seconds,
    minutes,
  } = useStopwatch({ autoStart: true });

  onTick(seconds + (minutes * 60));

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return (
    <>
    <span>{minutes}</span>:<span>{seconds}</span>
    </>
  );
}

export default class MyTimer extends React.Component {
  audio = React.createRef();
  workoutTimerRef;

  playBeep = () => {
      let sound = this.audio.current;
      sound.play()
          .catch(e => {
              console.log(e);
          });
  }

  onTick = (tick) => {
    const {beepAt} = this.props;
    if (tick > 0 && 
        tick % beepAt === 0 &&
        tick < MAX_TIME) {
      this.playBeep();
    }
  }

  render() {
    const {className} = this.props;
    
    return (
      <div className={className}>
        <MyStopwatch onTick={this.onTick}  />
        <audio ref={this.audio} src="/assets/beep-01a.mp3" preload="auto" />
      </div>
    );
  }
}