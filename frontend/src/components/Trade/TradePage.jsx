import React, { useState } from 'react';
import axios from 'axios';
import TickerSearch from './TickerSearch';
import StockInfo from './StockInfo';

function TradePage() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [stockInfo, setStockInfo] = useState(null);

  const handleSearch = async (ticker) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/marketdata/search/', { ticker });
      console.error(response);
      if (response.status === 200) {
        setText('Ticker found!');
        setColor('green');
        const data = response.data;
        const { status, message, ...rest } = data;
        setStockInfo(rest);
      }
    } catch (error) {
      setText('Ticker does not exist');
      setColor('red');
      console.error(error);
    }
  };

  const colorStyle = {
    color: color,
  };

  return (
    <>
      <TickerSearch onSearch={handleSearch} />
      <p style={colorStyle}>{text}</p>
      {stockInfo && <StockInfo stockInfo={stockInfo} />}
    </>
  );
}

export default TradePage;