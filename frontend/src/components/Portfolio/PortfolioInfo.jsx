import React from 'react';

function PortfolioInfo({ portfolioInfo }) {
  return (
    <table className="table mt-4">
      <tbody>
        {Object.entries(portfolioInfo).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PortfolioInfo;