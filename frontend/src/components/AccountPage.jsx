import React, { useState } from 'react';
import axios from 'axios';

function AccountPage() {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleDeposit = async () => {
    try {
      const user_id = localStorage.getItem('username');
      const response = await axios.post('http://127.0.0.1:8000/trade/deposit/', { user_id, depositAmount });
      console.error(response);
      if (response.status === 200) {
        const data = response.data["account_balance"];
        setBalance(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const user_id = localStorage.getItem('username');
      const response = await axios.post('http://127.0.0.1:8000/trade/withdraw/', { user_id, withdrawAmount });
      console.error(response);
      if (response.status === 200) {
        const data = response.data["account_balance"];
        setBalance(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepositChange = (event) => {
    setDepositAmount(event.target.value);
  }

  const handleWithdrawChange = (event) => {
    setWithdrawAmount(event.target.value);
  }

  return (
    <div>
      <h1>Current Balance: {balance}</h1>
      <input type="number" className="form-control" value={depositAmount} onChange={handleDepositChange} />
      <button className="btn btn-primary" onClick={handleDeposit}>
        Deposit
      </button>
      <input type="number" className="form-control" value={withdrawAmount} onChange={handleWithdrawChange} />
      <button className="btn btn-primary" onClick={handleWithdraw}>
        Withdraw
      </button>
    </div>
  );
}

export default AccountPage;