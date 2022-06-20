import React, { useState, useEffect } from "react";
import "./styles/SearchBox.css";

export default function SearchBox() {
  let [keyword, setKeyword] = useState("");
  let [name, setName] = useState("");
  let [robots, setRobots] = useState([]);
  let [response, setResponse] = useState();

  const newLocal = "http://localhost:5000/robots";
  function firstLetterUp(word) {
    let word1 = word.charAt(0).toUpperCase() + word.slice(1);
    return word1;
  }

  const handleSearchWord = (event) => {
    setKeyword(event.target.value);
  };
  async function search() {
    const connect = await fetch(newLocal, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setResponse(await connect.json());
  }
  async function deleteRobot(robot) {
    const deleteThis = await fetch(`${newLocal}/${robot.id}`, {
      method: "DELETE",
    });

    setResponse(await deleteThis.json());
  }
  useEffect(() => {
    fetch(newLocal)
      .then((res) => res.json())
      .then((data) => {
        setRobots(data);
      });
  }, [response]);
  return (
    <div className="SearchBox pt-5">
      <h1 className="mb-2 mt-4">{"your Roboteam".toUpperCase()}</h1>
      <form onSubmit={search} className="form-group m-5">
        <div className="d-inline">
          <input
            type="search"
            placeholder="Write a name"
            className="form-control d-inline shadow-sm "
            autoFocus="on"
            autoComplete="off"
            onChange={handleSearchWord}
            required
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-primary btn-rounded "
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
              <h3 className="card-text">{firstLetterUp(robot.name)}</h3>
              <button
                className="btn  btn-primary btn-rounded  py-2 px-4"
                onClick={() => {
                  deleteRobot(robot);
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
