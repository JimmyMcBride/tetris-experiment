import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const useInterval = (callback, frameRate) => {
  const savedCallback = useRef();
  const { gameStarted } = useSelector(state => state.game);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (gameStarted && frameRate !== null) {
      const id = setInterval(tick, frameRate * 16.6666666667);
      return () => {
        clearInterval(id);
      };
    }
  }, [frameRate, gameStarted]);
};

export default useInterval;
