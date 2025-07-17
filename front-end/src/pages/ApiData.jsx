// src/pages/ApiData/ApiData.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPosts } from '../services/apiService';
import Card from '../components/Card';
import Button from '../components/Button';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [data, search]);

  const handleSearch = () => {
    setPage(1);
    setFilteredData([]);
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    } else if (direction === 'next') {
      setPage(page + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">API Data</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 mr-2"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          variant="primary"
          onClick={handleSearch}
          className="mr-2"
        >
          Search
        </Button>
        <Button
          variant="primary"
          onClick={handleLoadMore}
          className="mr-2"
        >
          Load More
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            content={item.body}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {page > 1 && (
          <Button
            variant="secondary"
            onClick={() => handlePageChange('prev')}
          >
            Previous
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleLoadMore}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApiData;