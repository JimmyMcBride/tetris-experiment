import { useEffect } from "react";
import { DOWN, LEFT, RIGHT, ROTATE } from "../constants";

const useListenKeyPress = (callback: any) => {
  const keyDownHandler = (e: any) => {
    switch (e.keyCode) {
      case 40:
        callback(DOWN);
        break;
      case 37:
        callback(LEFT);
        break;
      case 38:
        callback(ROTATE);
        break;
      case 39:
        callback(RIGHT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
};

export default useListenKeyPress;
