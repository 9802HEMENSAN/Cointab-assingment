import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {

    
  return (
    <div>
      <h1>Home Page</h1>
      <button>Fetch Users</button>
      <button>Delete Users</button>
      <Link to="/users">
        <button>User Details</button>
      </Link>
    </div>
  );
};

export default HomePage;
