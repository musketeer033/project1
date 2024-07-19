import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const [jobs, setjobs] = useState();

  useEffect(() => {
    // Fetch jobs data from the API
    axios
      .get("https://vacancy.adnan-qasim.me/job/get-all-jobs")
      .then((response) => {
        setjobs(response.data); // Set fetched jobs to state
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  if (!jobs || jobs.length === 0) {
    return <div>Loading...</div>; // Display a loading state or handle empty data
  }

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP Vacancy</h3>
        <div className="banner">
          {jobs.slice(0, 4).map((element) => {
            const vacancyDetails = element.vacancy_details[0]; // Assuming you want the first item in vacancy_details array

            return (
              <div
                className="card flex flex-col justify-between "
                key={vacancyDetails.vacancy_title}
              >
                <div className="content">
                  {/* <div className="icon">{element.college_district}</div> */}
                  <div className="text">
                    <p>{vacancyDetails.subject_name}</p>
                    <p>{element.college_name}</p>
                  </div>
                </div>

                <button className="">
                  Vacancies available: {vacancyDetails.vacancy_count}
                </button>
              </div>
            );
          })}
        </div>
        <div className="banner">
          {jobs.slice(4, 8).map((element) => {
            const vacancyDetails = element.vacancy_details[0]; // Assuming you want the first item in vacancy_details array

            return (
              <div
                className="card flex flex-col justify-between"
                key={vacancyDetails.vacancy_title}
              >
                <div className="content">
                  {/* <div className="icon">{element.college_district}</div> */}
                  <div className="text">
                    <p>{vacancyDetails.subject_name}</p>
                    <p>{element.college_name}</p>
                  </div>
                </div>

                <button className="">
                  Vacancies available: {vacancyDetails.vacancy_count}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
