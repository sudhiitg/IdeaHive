import React from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme); // 'light' or 'dark'
  console.log('Current theme:', theme);

  return (

     
        <div className={theme === 'dark' ? 'bg-[rgb(16,23,42)] text-gray-200 min-h-screen' : 'bg-white text-gray-700'}>
        {children}
        </div>
      
      
       
       

  
     
   
  );
}
