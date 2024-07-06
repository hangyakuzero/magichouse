import React from 'react';

import { BackgroundGradient } from './ui/background-gradient';

const Card = ({ product }) => {
  return (

      
        
          <div className="card card-compact bg-base-100 w-96 shadow-xl relative z-10 p-4 rounded-2xl">
          
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                className="rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <div className="card-actions justify-between">
                <p>Rs {product.sizes[0].price}</p>
                <button className="btn btn-primary" >
                  Buy Now
                </button>
              </div>
            </div>
           
          </div>
  
      
  
  );
};

export default Card;
