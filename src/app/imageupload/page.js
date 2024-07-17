"use client"
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(file);
    };
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append('file', image); // Ensure 'file' matches the parameter expected by Cloudinary
        formData.append('name', name);
        formData.append('description', description);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.url); // Assuming 'url' is returned by the API endpoint
        } else {
          console.error('Failed to upload image', response.statusText);
        }
      } catch (error) {
        console.error('Failed to upload image', error);
      }
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
