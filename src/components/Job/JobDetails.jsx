import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    _id: id,
    title: "Software Engineer",
    category: "Technology",
    country: "United States",
    city: "San Francisco",
    location: "Remote",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    jobPostedOn: "2024-07-16",
    fixedSalary: 80000,
    salaryFrom: 60000,
    salaryTo: 90000,
  });

  const navigateTo = useNavigate();
  const { user } = useContext(Context);

  // useEffect(() => {
  //   axios
  //     .get(`https://jobdekho-wkbb.onrender.com/api/v1/job/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setJob(res.data.job);
  //     })
  //     .catch((error) => {
  //       navigateTo("/notfound");
  //     });
  // }, []);

  // Dummy check for authorization
  // if (!isAuthorized) {
  //   navigateTo("/login");
  // }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></> // Render additional options for employer
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
