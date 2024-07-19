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
        className={`bg-white rounded-md z-50  h-[50vh] w-full sm:w-4/5 md:w-3/5 xl:w-3/6 mt-20 sm:mr-20 py-4`}
      >
        {close && (
          <div className="flex  justify-end mr-4">
            <button onClick={handleClose}>
              {" "}
              <GrClose color="#f96363" />
            </button>
          </div>
        )}
        <div className="">
          <p className="">{modalData.point_of_contact.poc_mobile_number}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
