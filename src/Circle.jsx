import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

// Custom useInterval hook
function useInterval(callback, delay) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

// Dummy generateDataset function for example purposes
function generateDataset() {
  return Array.from({ length: 10 }, () => [
    Math.random() * 100,
    Math.random() * 50,
  ]);
}

export const Circles = () => {
  const [dataset, setDataset] = useState(generateDataset());
  const ref = useRef(null);

  useEffect(() => {
    const svgElement = d3.select(ref.current);

    svgElement
      .selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3);
  }, [dataset]);

  useInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);

  return (
    <>
      <div className="about--circles">
        <img
          src="../images/Ellipse-9.svg"
          className="color--circle--4"
          alt="logo"
        />
        <img
          src="../images/Group-228.svg"
          className="image--circle--1"
          alt="logo"
        />
        <img
          src="../images/Group-275.svg"
          className="image--circle--2"
          alt="logo"
        />

        <img
          src="../images/Group-280.svg"
          className="image--circle--3"
          alt="logo"
        />
                <img
          src="../images/Ellipse-10.svg"
          className="color--circle--4"
          alt="logo"
        />
        <img
          src="../images/Group-241.svg"
          className="color--circle--3"
          alt="logo"
        />
      </div>
      <svg viewBox="0 0 100 50" ref={ref} />
    </>
  );
};
