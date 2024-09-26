import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";
import ColorKey from "./ColorKey";
import data from "./Data";

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
  "she",
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
  "wasn't",
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
  "(i",
  "could",
  "can",
  "going",
  "made",
  "few",
  "bit",
  "like",
  "didn't",
  "each",
  "around",
  "you",
  "karen",
  "i'd",
  "went",
  "said",
  "did",
  "though",
  "although",
  "many",
  "ever",
  "baby",
  "remember",
  "one",
  "thing",
  "mum",
  "don't",
  "don’t",
  "don",
  "your",
  "lot",
  "come",
  "get",
  "ask",
  "take",
  "was",
  "was]",
  "i]",
  "[i",
  "got",
  "labour",
  "felt",
  "onto",
  "the]",
  "also",
  "when",
  "[the",
  "mother",
  "first",
  "remembered",
  "i'm",
  "much",
  "well",
  "whose",
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

const getBubbleData = (frequency, filteredData) => {
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
          existingBubble.size += frequency[word] * 1.8;
        } else {
          bubbleData.push({
            name: word,
            value: frequency[word],
            size: frequency[word] * 1.8,
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

// Get relevant sentence for tooltip
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

// Normalize sentence and add bolding for matching words
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

const colorMap = {
  labour: "#ff5733",
  labouring: "#ff5733",
  water: "#4955FA",
  came: "#493b39",
  first: "#F092D0",
  remember: "#ffcc33",
  "c-section": "#B6A09F",
  broken: "#B39E25",
  broke: "#B39E25",
  midwife: "#F09275",
  baby: "#F0F68F",
  child: "#F000FF",
  one: "#3E1E70",
  body: "#532c1e",
  feel: "#bcb8b1",
  husband: "#D35400",
  thing: "#76D7C4",
  felt: "#bcb8b1",
  even: "#3498DB",
  see: "#48C9B0",
  pain: "#E74C3C",
  coming: "#493b39",
  say: "#7FB3D5",
  due: "#AF7AC5",
  still: "#c0dfa1",
  tried: "#F39C12",
  moment: "#85C1E9",
  birth: "#D98880",
  everything: "#E59866",
  down: "#6C3483",
  hospital: "#7B68EE",
  aware: "#FF6347",
  hated: "#0c0f0a",
  back: "#4682B4",
  required: "#FFD700",
  actually: "#32CD32",
  every: "#BA55D3",
  day: "#40E0D0",
  lay: "#FF4500",
  horrible: "#DC143C",
  brave: "#FF1493",
  natural: "#228B22",
  kind: "#FF69B4",
  pretty: "#FFB6C1",
  blood: "#8B0000",
  caesarian: "#B6A09F",
  children: "#F000FF",
  matter: "#1ABC9C",
  gynae: "#8E44AD",
  lucky: "#F7DC6F",
  wanting: "#E67E22",
  mother: "#EC7063",
  sense: "#7DCEA0",
  month: "#5499C7",
  almost: "#48C9B0",
  thinking: "#AAB7B8",
  think: "#AAB7B8",
  birthing: "#E74C3C",
  literally: "#F5B041",
  op: "#ddded0",
  nothing: "#34495E",
  nobody: "#34495E",
  two: "#DC7633",
  mum: "#9B59B6",
  read: "#2980B9",
  emergency: "#E74C3C",
  book: "#F39C12",
  complication: "#8E44AD",
  checked: "#27AE60",
  situation: "#F5B041",
  time: "#1ABC9C",
  happening: "#766153",
  pregnancy: "#947c51",
  open: "#74C2E1",
  nice: "#FFCC66",
  miracle: "#20fa83",
  music: "#7B68EE",
  dream: "#9370DB",
  little: "#FFB6C1",
  people: "#4682B4",
  sound: "#1E90FF",
  home: "#8B4513",
  way: "#32CD32",
  planned: "#008080",
  crash: "#DC143C",
  aftermath: "#696969",
  style: "#FF69B4",
  green: "#3CB371",
  anaesthetist: "#87CEEB",
  six: "#f4a261",
  physical: "#faedcd",
  looked: "#240046",
  looking: "#240046",
  left: "#414833",
  filled: "#f95738",
  liquid: "#2c7da0",
  state: "#240046",
  part: "#c17c74",
  abandoned: "#495057",
  knew: "#ff8600",
  realm: "#d1ffc6",
  breastfeeding: "#faf3dd",
  calm: "#e1e5f2",
  partner: "#373d20",
  help: "#ba181b",
  breathed: "#3e5c76",
  falling: "#adb5bd",
  health: "#e5383b",
  different: "#6f2dbd",
  supportive: "#d8e2dc",
  night: "#1f1d2a",
  feed: "#ede7e3",
  formula: "#f2efea",
  lactation: "#fff8d6",
  consultant: "#062710",
  happy: "#ffe548",
  dropped: "#1dd3b0",
  pump: "#d4c7c8",
  paed: "#618985",
  struggling: "#2a0800",
  readmitted: "#8fcb9b"

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
  const [hoveredWord, setHoveredWord] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [wordFrequency, setWordFrequency] = useState({});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false); // Manage tooltip visibility

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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const combinedStories = filteredData
      .flatMap((entry) => entry.sentences)
      .join(" ");
    const frequency = countWords(combinedStories);
    setWordFrequency(frequency);
    const bubbleData = getBubbleData(frequency, filteredData);

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
      .style("pointer-events", "none")
      .style("box-shadow", "rgba(0, 0, 0, 0.3) 0 2px 10px");

    const isMobile = width < 768;

    const simulation = d3
      .forceSimulation(bubbleData)
      .force("charge", d3.forceManyBody().strength(isMobile ? -4 : -12))
      .force(
        "center",
        d3.forceCenter(
          width / (isMobile ? 2 : 1.8),
          height / (isMobile ? 4 : 2)
        )
      )
      .force(
        "collide",
        d3.forceCollide((d) => d.size + (isMobile ? 0.8 : 12))
      );

    const bubbles = svg
      .selectAll("circle")
      .data(bubbleData)
      .enter()
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => getColor(d.name))
      .classed("hovered", (d) => d.name === hoveredWord)
      .on("mouseover", (event, d) => {
        const entry = filteredData.find((entry) => entry.name === d.author);
        const relevantSentence = entry
          ? getRelevantSentence(entry.sentences, d.name)
          : "No relevant sentence found.";
        const boldedSentence = getBoldedSentence(relevantSentence, d.name);

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `
                <div class="tooltip">
                  <div class="card-name">${d.name}</div><br>
                  <hr><br>
                  "${boldedSentence}"<br>
                  <br>
                  <div class="tooltip-name-flex">
                  <div><img src="${d.portrait}" class="tooltip-portrait" alt="portrait"> </div> 
                  <div><strong>${d.author}</strong>, ${d.countryLivesIn}</div>
                  </div>
                  <br>

                  <hr><br>
                  Read full birth story <strong><a href="/story/${d.id}">here</a></strong></div>
              `
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);

        // Set tooltip visibility to true on mouseover
        setTooltipVisible(true);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        if (!tooltipVisible) {
          tooltip.transition().duration(500).style("opacity", 0);
        }
      });

    simulation.on("tick", () => {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, [filteredData, dimensions, tooltipVisible]);

  // Handle clicks outside tooltip to hide it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        tooltipVisible
      ) {
        setTooltipVisible(false);
        d3.select(tooltipRef.current)
          .transition()
          .duration(500)
          .style("opacity", 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipVisible]);

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
          <div className="dviz-title">birth stories</div>
          <p>
            For this data story, mothers are asked to share their birth story in
            as much detail as they can remember. These are a selection of some
            of the most frequent words based on the data we have collected so
            far. You can also filter by race, country (this is the country where
            the birth took place) and birth type.
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
          <ColorKey
            wordFrequency={wordFrequency}
            colorMap={colorMap}
            setHoveredWord={setHoveredWord}
          />
        </div>
      </div>
    </>
  );
};

export default BubbleChartComponent;
