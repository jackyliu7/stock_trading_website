import React, { useState } from 'react';
import axios from 'axios';
import PortfolioInfo from "./PortfolioInfo";

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [message, setMessage] = useState("");

  const handleButtonClick = async () => {
    const user_id = localStorage.getItem('username');
    try {
      const response = await axios.get('http://127.0.0.1:8000/trade/portfolio/', {
        params: { user_id: user_id }
      });

      console.error(response);
      if (response.status === 200) {
        const data = response.data;
        const { status, ...user_data } = data;
        setPortfolio(user_data);
      }
    } catch (error) {
      const data = error.response.data;
      const { status, message } = data;
      setMessage(message);
      console.error(error);
    }
  };

  return (
    <>
    <button className="btn btn-primary" onClick={handleButtonClick}>
      View Your Portfolio
    </button>
    {portfolio ? <PortfolioInfo portfolioInfo={portfolio} /> : message}
    </>
    );
}

export default PortfolioPage;