import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      _id: "1",
      title: "Software Engineer",
      category: "Technology",
      country: "United States",
    },
    {
      _id: "2",
      title: "Marketing Specialist",
      category: "Marketing",
      country: "Canada",
    },
    {
      _id: "3",
      title: "Financial Analyst",
      category: "Finance",
      country: "United Kingdom",
    },
  ]);

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.map((element) => (
            <div className="card" key={element._id}>
              <p>{element.title}</p>
              <p>{element.category}</p>
              <p>{element.country}</p>
              <Link to={`/job/${element._id}`}>Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
