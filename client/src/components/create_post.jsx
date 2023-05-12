import React, { useState } from 'react';
import axios from 'axios';
import './create_post.css';

const CreatePost = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':`bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log(response.data);
      // do something with the response
      if(response.data.code==1000){
        window.location.href='/search'
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
        <h3>Create A New Post</h3>
        <form className="form" onSubmit={handleSubmit}>
    
        <div>
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default CreatePost;
