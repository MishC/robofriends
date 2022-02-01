import React, { useState, useEffect } from "react";
import "./styles/SearchBox.css";

export default function SearchBox() {
  let [keyword, setKeyword] = useState("");
  let [name, setName] = useState("");
  let [robots, setRobots] = useState([]);

  function handleSearchWord(event) {
    setKeyword(event.target.value);
  }
  const newLocal = "http://localhost:5000/robots";
  function firstLetterUp(word) {
    let word1 = word.charAt(0).toUpperCase() + word.slice(1);
    return word1;
  }

  function search(event) {
    event.preventDefault();
    fetch(newLocal, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  }
  useEffect(() => {
    fetch(newLocal)
      .then((res) => res.json())
      .then((data) => {
        setRobots(data);
      });
  }, [search]);

  return (
    <div className="SearchBox pt-5">
      <h1 className="mb-2 mt-4">{"Create your own Roboteam".toUpperCase()}</h1>
      <form onSubmit={search} className="form-group m-5">
        <div className="d-inline">
          <input
            type="text"
            placeholder="Write a name"
            className="form-control d-inline shadow-sm  w-20 p-1"
            autoFocus="on"
            autoComplete="off"
            onChange={handleSearchWord}
            required
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-success btn-rounded "
            onClick={() => {
              setName(keyword);
            }}
          />
        </div>
      </form>
      {robots.map((robot) => {
        return (
          <div key={robot.id} className="d-inline-block p-2">
            <img
              src={`https://robohash.org/${robot.name}?set=set1`}
              alt={robot.name}
              className="image"
            />
            <div className="card-body">
              <h3 className="card-text">{robot.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
