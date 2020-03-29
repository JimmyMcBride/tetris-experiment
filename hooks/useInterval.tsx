import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const useInterval = (callback: any, frameRate: any) => {
  const savedCallback = useRef();
  const { gameStarted } = useSelector((state: any) => state.game);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect((): any => {
    function tick() {
      // ignoring saveCallback ts error, should be checked out.
      // @ts-ignore
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
