import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);

  // by default useEffect runs after each render
  useEffect(
    () => {
      document.title = `You have clicked ${count} times`;
//listeners on component mount
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // clean up function:
      return () => {
        //listeners on component Unmount

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
      // run useEffect only when the value in the array changes (if it was empty array it would only run on mount and unmount):
    },
    [count]
  );

  const handleMouseMove = event => {
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px"
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>
    </>
  );
};

export default App;
