import React, { useState, useEffect, useCallback, useRef } from "react";
import bgVideo from "./assets/homepage.mp4";

const url = "https://api.api-ninjas.com/v1/facts?limit=";
const key = "Ep+X5rHqzFVjqvEaw/zeuA==AQOtHJon5EVEw2U3";

const App = () => {
  const [count, setCount] = useState(0);
  const [facts, setFacts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const factsSectionRef = useRef();

  const fetchFacts = useCallback(async () => {
    try {
      const response = await fetch(url + count, {
        headers: {
          "X-API-Key": key,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setFacts(data.slice(0, count));
        }
      }
    } catch (error) {
      console.error("Error fetching facts: ", error);
    }
  }, [count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    fetchFacts();

    factsSectionRef.current.scrollIntoView();
  };

  useEffect(() => {
    if (submitted) fetchFacts();
  }, [fetchFacts, submitted]);

  return (
    <main>
      <header>
        <div className="logo">InfoSphere</div>
      </header>
      <div className="bg">
        <video autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="bg-purple"></div>
      </div>
      <div className="title">Dive into the Sea of Facts.</div>
      <form className="fact-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">facts:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
      {submitted && facts && facts.length > 0 && (
        <article className="facts" ref={factsSectionRef}>
          <div className="facts-title">Facts</div>
          <div className="facts-container">
            {facts.map((fact, index) => (
              <p className="fact" key={index}>
                {fact.fact}
              </p>
            ))}
          </div>
        </article>
      )}
    </main>
  );
};

export default App;
