// src/pages/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to my task manager app</h1>
      <p className="text-gray-700 mb-8">
        This is the home page of the application.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/tasks">
          <Button variant="primary">Go to Tasks</Button>
        </Link>
        <Link to="/api-data">
          <Button variant="secondary">View API Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;