import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>
      <p>Click the <em>add</em> button in the bottom right to create a new survey.</p>
      <p className="red-text">I have not yet implemented the final review/submit screen for created surveys.</p>
      <div className="fixed-action-btn">
        <Link to='/surveys/new/' className="btn-floating btn-large black">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
