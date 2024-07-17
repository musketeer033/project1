import React from 'react';

const Navbar = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-600 font-bold text-xl mr-3">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Coat_of_arms_of_Chhattisgarh.svg/300px-Coat_of_arms_of_Chhattisgarh.svg.png' alt='' />
        </div>
        <div className="text-lg font-bold">Your Company Name</div>
      </div>
      <button onClick={onLogout} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Logout</button>
    </div>
  );
};

export default Navbar;
