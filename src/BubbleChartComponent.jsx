import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";
import ColorKey from "./ColorKey";
import data from "./Data";
import colorMap from "./ColorMap";
import stopWords from "./StopWords";

const normalizeWord = (word) => {
  if (word.endsWith("s") && word.length > 1) {
    return word.slice(0, -1);
  }
  return word;
};

const countWords = (text) => {
  const words = text
    .toLowerCase()
    .replace(/[.,!?:;]/g, "")
    .split(/\s+/); // Simplified punctuation removal
  const frequency = {};

  words.forEach((word) => {
    const normalizedWord = normalizeWord(word);
    if (!stopWords.has(normalizedWord)) {
      frequency[normalizedWord] = (frequency[normalizedWord] || 0) + 1;
    }
  });

  return frequency;
};

export const getBubbleData = (frequency, filteredData) => {
  const bubbleData = [];

  filteredData.forEach((entry) => {
    const words = entry.birthStory
      .toLowerCase()
      .replace(/[.,!?:;]/g, "")
      .split(" "); // Simplified punctuation removal

    words.forEach((word) => {
      if (frequency[word] >= 3) {
        const existingBubble = bubbleData.find(
          (bubble) => bubble.name === word
        );
        if (existingBubble) {
          existingBubble.value += frequency[word];
          existingBubble.size += frequency[word] * 0.25;
        } else {
          bubbleData.push({
            name: word,
            value: frequency[word],
            size: frequency[word],
            story: entry.birthStory,
            author: entry.name,
            country: entry.country,
            countryLivesIn: entry.countryLivesIn,
            portrait: entry.portrait,
            noOfChildren: entry.noOfChildren,
            noOfChild: entry.noOfChild,
            birthDate: entry.birthDate,
            birthAge: entry.birthAge,
            city: entry.city,
            link: entry.link,
            id: entry.id,
            motherName: entry.motherName,
          });
        }
      }
    });
  });

  return bubbleData;
};

const getRelevantEntries = (word, filteredData) => {
  const cleanWord = normalizeWord(word.toLowerCase());
  const wordBoundaryRegex = new RegExp(`\\b${cleanWord}\\b`);

  const matchingEntries = filteredData.filter((entry) => {
    return entry.sentences.some((sentence) =>
      wordBoundaryRegex.test(sentence.toLowerCase())
    );
  });

  return matchingEntries
    .map((entry) => {
      const relevantSentence = entry.sentences.find((sentence) =>
        wordBoundaryRegex.test(sentence.toLowerCase())
      );
      return {
        sentence: relevantSentence,
        motherName: entry.motherName,
        portrait: entry.portrait,
        countryLivesIn: entry.countryLivesIn,
        id: entry.id, // Include the correct id for the full story
      };
    })
    .filter((result) => result.sentence);
};

const getBoldedSentence = (sentence, word) => {
  const cleanWord = normalizeWord(word.toLowerCase());
  return sentence
    .split(" ")
    .map((token) => {
      const cleanToken = normalizeWord(
        token.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase()
      );
      if (cleanToken === cleanWord) {
        return `<strong>${token}</strong>`;
      }
      return token;
    })
    .join(" ");
};

const getColor = (word) => colorMap[word] || "#8884d8";

const BubbleChartComponent = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const containerRef = useRef();
  const [filters, setFilters] = useState({
    race: "",
    country: "",
    birthType: "",
  });
  const [filteredData, setFilteredData] = useState(data);
  const [bubbleData, setBubbleData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const mobileTooltipTimeout = 20000;
  const desktopTooltipTimeout = 2000;

  const updateFilteredDataAndBubbles = () => {
    const { race, country, birthType } = filters;

    const filtered = data.filter((entry) => {
      return (
        (race === "" || entry.race.toLowerCase() === race.toLowerCase()) &&
        (country === "" ||
          entry.country.toLowerCase() === country.toLowerCase()) &&
        (birthType === "" ||
          entry.birthKind.toLowerCase() === birthType.toLowerCase())
      );
    });

    setFilteredData(filtered);

    const combinedStories = filtered
      .flatMap((entry) => entry.sentences)
      .join(" ");
    const frequency = countWords(combinedStories);
    const bubbles = getBubbleData(frequency, filtered);

    setBubbleData(bubbles);
  };

  useEffect(() => {
    updateFilteredDataAndBubbles();
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (!bubbleData.length) return; // Exit if no bubble data

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const tooltip = d3
      .select(tooltipRef.current)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "15px")
      .style("border", "none")
      .style("border-radius", "10px")
      .style("pointer-events", "auto")
      .style("box-shadow", "rgba(0, 0, 0, 0.3) 0 2px 10px");

    const isMobile = width < 768;

    let timeoutId;
    let isMouseInsideTooltip = false;

    const simulation = d3
      .forceSimulation(bubbleData)
      .force("charge", d3.forceManyBody().strength(isMobile ? -2 : -2))
      .force(
        "center",
        d3.forceCenter(
          width / (isMobile ? 2.2 : 2.5),
          height / (isMobile ? 3 : 2)
        )
      )
      .force(
        "collide",
        d3.forceCollide((d) => d.size + (isMobile ? 1 : 5))
      );

    const bubbles = svg
      .selectAll("circle")
      .data(bubbleData)
      .enter()
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => getColor(d.name))
      .on("mouseover", (event, d) => {
        clearTimeout(timeoutId);
        const relevantResults = getRelevantEntries(d.name, filteredData);

        if (relevantResults.length > 0) {
          const randomResult =
            relevantResults[Math.floor(Math.random() * relevantResults.length)];
          const boldedSentence = getBoldedSentence(
            randomResult.sentence,
            d.name
          );
          const wordColor = getColor(d.name);

          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(
              `
                <div class="tooltip">
                  <div class="card-flex">
                    <div class="card-name">${d.name}</div>
                    <div class="word-dot" style="border-radius: 50%; background-color: ${wordColor};"></div>
                  </div><br>
                  <hr><br>
                  "${boldedSentence}"<br><br>
                  <div class="tooltip-name-flex">
                    <div><img src="${randomResult.portrait}" class="tooltip-portrait" alt="portrait"> </div> 
                    <div><strong>${randomResult.motherName}</strong>, ${randomResult.countryLivesIn}</div>
                  </div><br><hr><br>
                  Read full birth story <strong><a href="#/story/${randomResult.id}">here</a></strong>
                </div>
              `
            )
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`);

          setTooltipVisible(true);
        } else {
          tooltip.transition().duration(200).style("opacity", 0);
          setTooltipVisible(false);
        }
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        if (!isMouseInsideTooltip) {
          timeoutId = setTimeout(
            () => {
              tooltip.transition().duration(500).style("opacity", 0);
              setTooltipVisible(false);
            },
            isMobile ? mobileTooltipTimeout : desktopTooltipTimeout
          );
        }
      });

    const tooltipElement = d3.select(tooltipRef.current);

    tooltipElement.on("mouseover", () => {
      clearTimeout(timeoutId);
      isMouseInsideTooltip = true;
    });

    tooltipElement.on("mouseout", () => {
      isMouseInsideTooltip = false;
      timeoutId = setTimeout(
        () => {
          tooltip.transition().duration(500).style("opacity", 0);
          setTooltipVisible(false);
        },
        isMobile ? mobileTooltipTimeout : desktopTooltipTimeout
      );
    });

    simulation.on("tick", () => {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [bubbleData, dimensions]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <div ref={containerRef} className="data-viz">
        <div className="filter-section">
          <div className="dviz-title">remembering the first 40 days</div>
          <br />
          <p>
            For this data story, mothers and parents are asked to share their
            birth/coming home story and first weeks with their child in as much
            detail as they can remember. These are a selection of some of the
            most frequent words based on the data we have collected so far. You
            can also filter by race of the mother, country (this is the country
            where the birth took place) and birth type. Explore each story
            through the tooltips. This is a growing data story. You can
            contribute to it{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>
          </p>
          <p className="best-viewed">
            <strong>
              Please note: this data visualisation is best viewed and explored
              on a desktop
            </strong>
          </p>

          <br />
          <label className="search-category">
            <div>Race/Ethnicity:</div>
            <select
              name="race"
              value={filters.race}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="white">White</option>
              <option value="white, other">White, other</option>
              <option value="coloured">Coloured</option>
              <option value="Black African">Black African</option>
              <option value="Indian">Indian</option>
            </select>
          </label>

          <label className="search-category">
            Country:
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="South Africa">South Africa</option>
              <option value="Egypt">Egypt</option>
              <option value="The Netherlands">The Netherlands</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </label>

          <label className="search-category">
            Birth Type:
            <select
              name="birthType"
              value={filters.birthType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Caeserian">Caeserian</option>
              <option value="Vaginal">Vaginal</option>
            </select>
          </label>
        </div>
        {/* Render a message if no data is found */}
        {filteredData.length === 0 || bubbleData.length === 0 ? (
          <div className="limited-data">
            <p>
              Data for this search is currently too limited. Try broader
              filters.
            </p>
          </div>
        ) : (
          <>
            <div>
              <svg ref={svgRef} className="bubble-chart"></svg>
              <div ref={tooltipRef} />
              <div className="color-key-main"></div>
            </div>
          </>
        )}
      </div>
      <ColorKey bubbleData={bubbleData} colorMap={colorMap} />
    </>
  );
};

export default BubbleChartComponent;
