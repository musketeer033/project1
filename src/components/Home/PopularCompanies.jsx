import React, { useEffect, useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {

  const [jobs, setjobs] = useState()

  useEffect(() => {
    // Fetch jobs data from the API
    axios
      .get("https://vacancy.adnan-qasim.me/job/get-all-jobs")
      .then((response) => {
        console.log(response.data); // Ensure API response structure matches your needs
        setjobs(response.data); // Set fetched jobs to state
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bangalore, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "USA",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "California",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {jobs.slice.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;