import React from 'react';
import Input from '@/components/atoms/Input';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "",
  ...props 
}) => {
  return (
    <Input
      type="text"
      icon="Search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`max-w-md ${className}`}
      {...props}
    />
  );
};

export default SearchBar;