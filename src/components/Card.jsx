import React from 'react';

import { BackgroundGradient } from './ui/background-gradient';

const Card = ({ product }) => {
  return (

      
        
          <div className="card card-compact bg-base-100 w-96 shadow-xl relative z-10 p-4 rounded-2xl">
          
            <figure>
            <img src={product.productImage} alt={product.name} className="rounded-xl" />
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
