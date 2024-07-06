// components/ProductForm.js
"use client"
import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    name: '',
    categories: '',
    productImage: '',
    brand: '',
    fragranceNotes: '',
    sizes: [{ volume: '', price: '', stock: '' }],
    gender: 'Unisex',
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = formData.sizes.map((size, i) =>
      i === index ? { ...size, [name]: value } : size
    );
    setFormData((prevData) => ({
      ...prevData,
      sizes: newSizes,
    }));
  };

  const handleAddSize = () => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: [...prevData.sizes, { volume: '', price: '', stock: '' }],
    }));
  };

  const handleRemoveSize = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      sizes: newSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesArray = formData.categories.split(',').map(cat => cat.trim());
    const fragranceNotesArray = formData.fragranceNotes.split(',').map(note => note.trim());
    const productData = { ...formData, categories: categoriesArray, fragranceNotes: fragranceNotesArray };

    try {
      const response = await fetch('/api/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product created successfully:', result);
       
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
        // Reset the form or handle successful creation
      } else {
        const errorData = await response.json();
       
        console.error('Error creating product:', errorData);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-base-100 p-6 mx-auto space-y-5'>
      <div className='text-xl '>
        <label  >Description: </label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Categories (comma separated): </label>
        <input type="text" name="categories" value={formData.categories} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Product Image URL: </label>
        <input type="text" name="productImage" value={formData.productImage} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Brand: </label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Fragrance Notes (comma separated): </label>
        <input type="text" name="fragranceNotes" value={formData.fragranceNotes} onChange={handleChange} required />
      </div>
      <div className='text-xl'>
        <label>Gender: </label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      <div className='text-xl'>
        <label>Sizes:</label>
        {formData.sizes.map((size, index) => (
          <div key={index}>
            <input type="number" name="volume" placeholder="Volume (ml)" value={size.volume} onChange={(e) => handleSizeChange(index, e)} required />
            <input type="number" name="price" placeholder="Price" value={size.price} onChange={(e) => handleSizeChange(index, e)} required />
            <input type="number" name="stock" placeholder="Stock" value={size.stock} onChange={(e) => handleSizeChange(index, e)} />
            <button className='btn btn-error mb-4 mx-3' type="button" onClick={() => handleRemoveSize(index)}>Remove Size</button>
          </div>
        ))}
        <button type="button" className='btn btn-neutral ' onClick={handleAddSize}>Add Size</button>
      </div>
      <button type="submit" className=' btn btn-accent'>Create Product</button>
    </form>
  );
};

export default ProductForm;
