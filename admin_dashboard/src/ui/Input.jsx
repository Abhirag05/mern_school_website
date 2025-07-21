import React from 'react';

export const Input = ({ ...props }) => (
    <input
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100"
    />
);