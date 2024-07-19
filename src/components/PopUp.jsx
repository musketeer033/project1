import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
// import { MdError } from "react-icons/md";
// import { SiCachet } from "react-icons/si";
// import ReportOption from "./pop-up/ReportOption";

const PopUp = ({ modalData, handleClose }) => {
  const [loading, setLoading] = useState(false);
  console.log(modalData);
  return (
    <div className="fixed inset-0 flex  justify-center z-50">
      <div className="absolute inset-0 bg-black/50 opacity-75"></div>
      <div
        className={`bg-white rounded-md z-50  h-[30vh] w-full sm:w-4/5 md:w-3/5 xl:w-[30vw] mt-52 sm:mr-20 py-4`}
      >
        {close && (
          <div className="flex  justify-end mr-4">
            <button onClick={handleClose}>
              {" "}
              <GrClose color="#f96363" />
            </button>
          </div>
        )}
          <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold ">Contact</h1>
               <div className="w-full mt-5 flex justify-center items-center flex-col">
               <p className="text-lg flex flex-row gap-2 mt-3">
                 <span className="font-bold">Name:-</span> <span className=" text-md">{modalData.point_of_contact.poc_full_name}</span>
                </p>
                <p className="text-lg flex flex-row gap-2 mt-3">
                 <span className="font-bold"> Phone:-</span><span className=" text-md">{modalData.point_of_contact.poc_mobile_number}</span>
                </p>
               </div>
              </div>
      </div>
    </div>
  );
};

export default PopUp;
