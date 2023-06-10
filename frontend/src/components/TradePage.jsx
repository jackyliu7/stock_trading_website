import React, { useState } from 'react';
import axios from 'axios';

function TradePage() {

  const [text, setText] = useState("")
  const [color, setColor] = useState("")
  const [ticker, setTicker] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/marketdata/search/', { ticker });
      console.error(response)
      if (response.status == 200) {
        setText("Ticker found!")
        setColor("green")
      }
    } catch (error) {
      setText("Ticker does not exist")
      setColor("red")
      console.error(error);
    }
  }

  const handleChange = (event) => {
    setTicker(event.target.value)
  }

  const colorStyle = {
    color: color
  };

  return (
    <>
      <div className="input-group">
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" placeholder="Search for stock tickers" onChange={handleChange}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSearch}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <p style={colorStyle}>{text}</p>
    </>);
}

export default TradePage;