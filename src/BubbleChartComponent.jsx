import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";

import data from "./Data"; // Adjust the path as needed

// List of stop words to exclude
const stopWords = new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "for",
  "from",
  "further",
  "had",
  "hadn",
  "has",
  "hasn",
  "have",
  "haven",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "isn",
  "it",
  "its",
  "itself",
  "just",
  "me",
  "mightn",
  "more",
  "most",
  "mustn",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "now",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "re",
  "s",
  "same",
  "shan",
  "should",
  "shouldn",
  "so",
  "some",
  "such",
  "t",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "ve",
  "very",
  "was",
  "wasn",
  "we",
  "were",
  "weren",
  "what",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "won",
  "would",
  "wouldn",
  "-",
  "(i"
]);

const normalizeWord = (word) => {
  // Handle basic pluralization
  if (word.endsWith("s") && word.length > 1) {
    return word.slice(0, -1); // Remove 's' for basic plural
  }
  return word;
};

const countWords = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const frequency = {};

  words.forEach((word) => {
    const normalizedWord = normalizeWord(word);
    if (!stopWords.has(normalizedWord)) {
      // Exclude stop words
      frequency[normalizedWord] = (frequency[normalizedWord] || 0) + 1;
    }
  });

  return frequency;
};

const getBubbleData = (frequency) => {
  const bubbleData = [];

  data.forEach((entry) => {
    const words = entry.birthStory
      .toLowerCase()
      .replace(/[.,!?;]*/g, "")
      .split(/\s+/);

    words.forEach((word) => {
      if (frequency[word] >= 2) {
        // Only include words with a frequency greater than 2
        const existingBubble = bubbleData.find(
          (bubble) => bubble.name === word
        );
        if (existingBubble) {
          existingBubble.value += frequency[word];
          existingBubble.size += frequency[word] * 5; // Adjust size based on frequency
        } else {
          bubbleData.push({
            name: word,
            value: frequency[word],
            size: frequency[word] * 5,
            story: entry.birthStory, // Include the birth story
            author: entry.name, // Include the author's name
          });
        }
      }
    });
  });

  return bubbleData;
};

const getRelevantSentence = (sentences, word) => {
  // Filter sentences that contain the word
  const matchingSentences = sentences.filter((sentence) =>
    sentence.toLowerCase().includes(word.toLowerCase())
  );

  // Select a random matching sentence or return a fallback
  if (matchingSentences.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingSentences.length);
    return matchingSentences[randomIndex];
  }

  return "No relevant sentence found.";
};

const colorMap = {
  labour: "#ff5733",
  labouring: "#ff5733",
  water: "#4955FA",
  came: "#48DFC1",
  first: "#F092D0",
  remember: "#ffcc33",
  "c-section": "#B6A09F",
  broken: "#B39E25",
  broke: "#B39E25",
  midwife: "#F09275",
  baby: "#F0F68F",
  she: "#F000FF",
};

const getColor = (word) => colorMap[word] || "#8884d8";

const BubbleChartComponent = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  // State to hold selected filter values
  const [filters, setFilters] = useState({
    race: "",
    country: "",
    birthType: "",
  });

  // State to hold filtered data
  const [filteredData, setFilteredData] = useState(data);

  // Filter the data based on the selected filters
  useEffect(() => {
    const { race, country, birthType } = filters;

    const filtered = data.filter((entry) => {
        return (
            (race === "" || entry.race.toLowerCase() === race.toLowerCase()) &&
            (country === "" || entry.country.toLowerCase() === country.toLowerCase()) &&
            (birthType === "" || entry.birthKind.toLowerCase() === birthType.toLowerCase())
        );
    });

    setFilteredData(filtered);
}, [filters]);



  useEffect(() => {
    const combinedStories = filteredData
      .flatMap((entry) => entry.sentences)
      .join(" ");

    const wordFrequency = countWords(combinedStories); // Assuming countWords is defined elsewhere
    const bubbleData = getBubbleData(wordFrequency); // Assuming getBubbleData is defined elsewhere

    const width = parseInt(d3.select(".bubble-chart").style("width"));
    const height = parseInt(d3.select(".bubble-chart").style("height"));

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3
      .select(tooltipRef.current)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "15px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "10px")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation(bubbleData)
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide((d) => d.size + 20)
      );

    const bubbles = svg
      .selectAll("circle")
      .data(bubbleData)
      .enter()
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => getColor(d.name)) // Assuming getColor is defined elsewhere
      .on("mouseover", (event, d) => {
        // Ensure that entry is coming from the filteredData
        const entry = filteredData.find((entry) => entry.name === d.author);
        
        // Find the relevant sentence for the correct word and author
        const relevantSentence = entry
            ? getRelevantSentence(entry.sentences, d.name) 
            : "No relevant sentence found.";
    
        // Bold the relevant word in the sentence
        const boldedSentence = relevantSentence
            .split(" ")
            .map((word) =>
                word.toLowerCase() === d.name.toLowerCase() ||
                normalizeWord(word).toLowerCase() === d.name.toLowerCase()
                    ? `<strong>${word}</strong>`
                    : word
            )
            .join(" ");
    
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
            .html(
                `
                <div class="tooltip">    
                    <div class="card-name">${d.name}</div><br>
                    <hr><br>
                    <strong>Frequency:</strong> ${d.value}<br>
                    <strong>Quote:</strong> "${boldedSentence}"<br>
                    <strong>Author:</strong> ${d.author}
                </div>
                `
            )
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`);
    })
    

      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    simulation.on("tick", () => {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    return () => simulation.stop();
  }, [filteredData]);

  // Update filter values
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="filter-section">
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
            {/* Add other race options here */}
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
            {/* Add other country options here */}
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
            {/* Add other birth type options here */}
          </select>
        </label>
      </div>

      <svg ref={svgRef} className="bubble-chart"></svg>
      <div ref={tooltipRef} />
    </>
  );
};

export default BubbleChartComponent;
