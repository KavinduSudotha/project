import React, { useState } from 'react';
import axios from 'axios';

function SearchForm({ onUpdate }) {
  const [searchBy, setSearchBy] = useState('job_id');
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/jobrout/search?searchBy=${searchBy}&keyword=${keyword}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleUpdate = (job) => {
    onUpdate(job);
  };

  return (
    <div>
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
        <option value="job_id">Job ID</option>
        <option value="status">Status</option>
      </select>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((job) => (
          <li key={job.job_id}>
            {job.job_id} - {job.status} -{' '}
            <button onClick={() => handleUpdate(job)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
