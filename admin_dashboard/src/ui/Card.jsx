import React from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        {children}
    </div>
);

// You can export it as default if you prefer that convention
export default Card;