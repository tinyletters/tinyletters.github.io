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
  const words = text.toLowerCase().split(/\s+/);
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
    let words = entry.birthStory.toLowerCase();
    const punctuations = [".", ",", "!", "?", ";"];
    punctuations.forEach((punctuation) => {
      words = words.split(punctuation).join("");
    });

    words = words.split(" ");

    words.forEach((word) => {
      if (frequency[word] >= 2) {
        const existingBubble = bubbleData.find(
          (bubble) => bubble.name === word
        );
        if (existingBubble) {
          existingBubble.value += frequency[word];
          existingBubble.size += frequency[word] * 1.7;
        } else {
          bubbleData.push({
            name: word,
            value: frequency[word],
            size: frequency[word] * 1.7,
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
          });
        }
      }
    });
  });

  return bubbleData;
};

const getRelevantSentence = (sentences, word) => {
  const matchingSentences = sentences.filter((sentence) =>
    sentence.toLowerCase().includes(word.toLowerCase())
  );

  if (matchingSentences.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingSentences.length);
    return matchingSentences[randomIndex];
  }

  return "";
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
  const [wordFrequency, setWordFrequency] = useState({});
  const [bubbleData, setBubbleData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
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
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
  }, []);

  useEffect(() => {
    const combinedStories = filteredData
      .flatMap((entry) => entry.sentences)
      .join(" ");
    const frequency = countWords(combinedStories);
    setWordFrequency(frequency);
    const bubbleData = getBubbleData(frequency, filteredData);
    setBubbleData(bubbleData);

    const { width, height } = dimensions;

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

    let timeoutId;
    let isMouseInsideTooltip = false;

    const isMobile = width < 768;

    const simulation = d3
      .forceSimulation(bubbleData)
      .force("charge", d3.forceManyBody().strength(isMobile ? -2 : -3))
      .force(
        "center",
        d3.forceCenter(
          width / (isMobile ? 2.2 : 1.6),
          height / (isMobile ? 3 : 2)
        )
      )
      .force(
        "collide",
        d3.forceCollide((d) => d.size + (isMobile ? 1 : 6))
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
        const entry = filteredData.find((entry) => entry.name === d.author);
        const relevantSentence = entry
          ? getRelevantSentence(entry.sentences, d.name)
          : "No relevant sentence found.";
        const boldedSentence = getBoldedSentence(relevantSentence, d.name);

        const wordColor = getColor(d.name);

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `
                <div class="tooltip">
                  <div class="card-flex">
                  <div class="card-name">
                  ${d.name}
                  </div>
                  <div class="word-dot" style="border-radius: 50%; background-color: ${wordColor};"></div>
             </div><br>
                  <hr><br>
                  "${boldedSentence}"<br>
                  <br>
                  <div class="tooltip-name-flex">
                  <div><img src="${d.portrait}" class="tooltip-portrait" alt="portrait"> </div> 
                  <div><strong>${d.author}</strong>, ${d.countryLivesIn}</div>
                  </div>
                  <br>

                  <hr><br>
                  Read full birth story <strong><a href="#/story/${d.id}">here</a></strong></div>
              `
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);

        setTooltipVisible(true);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        if (!isMouseInsideTooltip) {
          timeoutId = setTimeout(() => {
            tooltip.transition().duration(500).style("opacity", 0);
            setTooltipVisible(false);
          }, 5000);
        }
      });

    const tooltipElement = d3.select(tooltipRef.current);

    tooltipElement.on("mouseover", () => {
      clearTimeout(timeoutId);
      isMouseInsideTooltip = true;
    });

    tooltipElement.on("mouseout", () => {
      isMouseInsideTooltip = false;
      timeoutId = setTimeout(() => {
        tooltip.transition().duration(500).style("opacity", 0);
        setTooltipVisible(false);
      }, 5000);
    });

    simulation.on("tick", () => {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, [filteredData, dimensions, tooltipVisible]);

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
            <div>Race:</div>
            <select
              name="race"
              value={filters.race}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="white">White</option>
              <option value="coloured">Coloured</option>
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

        <svg ref={svgRef} className="bubble-chart"></svg>

        <div ref={tooltipRef} />
        <div>
          <ColorKey bubbleData={bubbleData} colorMap={colorMap} />
        </div>
      </div>
    </>
  );
};

export default BubbleChartComponent;
