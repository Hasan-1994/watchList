import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

function fetchFunction() {
    const [data, setData] = useState({ movies: [] });
    const urlData = 'https://reactnative.dev/movies.json'

    useEffect(() => {
        const result = async () => {
            const response = await axios(urlData);
            setData(response.data)
        }
        result();
    }, []);
    const fetchData = data.movies.map((item) => {
        return (
          <div className="listElements" onClick={()=> hizufuegen(item.title)}>
            <a className="listElementsText">{item.title}</a>
          </div>
        )
      })

      const hizufuegen = text => {
        const newTodos = [...toDo, { text }];
        setToDo(newTodos);
      };
    return (
        <div className="mainElements">
            <h2>Vorhandene Filme</h2>
            <h3>Bitte klicken Sie den jeweilgen Titel an!</h3>
            {/* Die Daten die gezogen wurden werden hier angezeigt */}
            {data && fetchData}




        </div>
    )
}
export default fetchFunction;