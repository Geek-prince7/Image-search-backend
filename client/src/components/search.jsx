import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './search.css'
// import { Path } from 'react-router-dom';
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const token=localStorage.getItem('token')
//   console.log('token',token)
  const callApi=async ()=>{
    try {
      // console.log('i am here')
      const response = await axios.get(`http://localhost:5000/post/search?q=${query}`,{
        headers:{
        Authorization:`bearer ${token}`
      }});
    console.log(`result ${JSON.stringify(response.data.data)}`)
    setResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    await callApi();
  };

  useEffect(()=>{
    callApi();

  },[])
  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" >Search</button>
      </form>
      <div className="card-container">
        {results.map((result) => {
            
          return <div className="card" key={result._id}>
            <img className='card-img' src={'http://localhost:5000/'+result.image} alt={result.name} />
            <p className='card-text'>{result.name}</p>
          </div>
        })}
      </div>
      <h4 className='cnp-heading'><a href='/create/post'>Create new Post</a></h4>
    </div>
  );
}

export default Search;
