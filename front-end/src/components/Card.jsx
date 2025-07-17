import React from 'react';

const Card = ({ title, content, ...props }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4" {...props}>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Card;