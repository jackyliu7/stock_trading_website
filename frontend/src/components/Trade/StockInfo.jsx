import React from 'react';

function StockInfo({ stockInfo }) {
  return (
    <table className="table mt-4">
      <tbody>
        {Object.entries(stockInfo).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockInfo;