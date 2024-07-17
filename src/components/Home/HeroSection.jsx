// import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  const navigate = useNavigate();

  const handleAddVacancy = ()=>{
    console.log("Add Vacancy")
  }
  return (
    <>
      <div className="heroSection">
        <div className="flex justify-end px-10">
          <div className=" flex gap-5">
          <button
              onClick={()=>navigate("/login")}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              College
            </button>
            <button
              onClick={()=>navigate("/job/getall")}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Jobs
            </button>
          </div>
        </div>
        <div className="container">
          <div className="title">
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            <p>A very simple but effective place for you to find jobs.</p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
