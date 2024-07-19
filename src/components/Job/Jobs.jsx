import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { FaFile } from "react-icons/fa";
import PopUp from "../PopUp";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jodData, setJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCollege, setSearchCollege] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [serachSubject, setSerachSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3); // Number of jobs per page
  const navigate = useNavigate();
  const [subject, setSubject] = useState([]);
  const [convertedData, setConvertedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const Division = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    allSubject();
    const options = {
      method: "GET",
      url: "https://vacancy.adnan-qasim.me/job/get-all-jobs",
    };

    axios
      .request(options)
      .then(function (response) {
        transformData(response.data);
        // setJobData(response.data);
        // setJobs(response.data); // Initialize jobs with fetched data

        // Extract unique college names
        const collegeNames = Array.from(
          new Set(response.data.map((job) => job.college_name))
        );
        setSearchCollege(collegeNames);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let filteredJobs = jodData;

    if (searchTerm !== "") {
      filteredJobs = filteredJobs.filter(
        (job) => job.college_division === Number(searchTerm)
      );
    }

    if (selectedCollege !== "") {
      filteredJobs = filteredJobs.filter((job) =>
        job.college_name.toLowerCase().includes(selectedCollege.toLowerCase())
      );
    }

    if (serachSubject !== "") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          Array.isArray(job.vacancy_details) &&
          job.vacancy_details.some((detail) =>
            detail.subject_name
              .toLowerCase()
              .includes(serachSubject.toLowerCase())
          )
      );
    }
    setCurrentPage(1); // Reset current page when filters change
    setJobs(filteredJobs);
  }, [searchTerm, selectedCollege, serachSubject, jodData]);

  const transformData = (data) => {
    const transformedData = [];

    data.forEach((item) => {
      const vacancyDetails = item.vacancy_details || [];

      if (vacancyDetails.length > 1) {
        vacancyDetails.forEach((vacancy) => {
          const newItem = {
            college_district: item.college_district,
            college_division: item.college_division,
            college_name: item.college_name,
            college_state: item.college_state,
            id: item.id,
            job_desc: item.job_desc,
            point_of_contact: item.point_of_contact,
            vacancy_details: [vacancy],
          };
          transformedData.push(newItem);
        });
      } else {
        transformedData.push(item);
      }
    });

    setJobData(transformedData), setJobs(transformedData);
  };

  const allSubject = () => {
    const options = {
      method: "GET",
      url: "https://vacancy.adnan-qasim.me/job/get-all-subjects",
    };

    axios
      .request(options)
      .then(function (response) {
        setSubject(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Logic for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (!jobs.length) {
  //   return <div className="loading">Loading...</div>
  // }

  const handleModal = (modal) => {
    setShowModal(true);
    setModalData(modal);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData([]);
  };

  return (
    <section className="jobs page bg-gray-100 py-10">
      <div className="flex justify-end px-5">
        <button
          onClick={() => navigate("/login")}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          College
        </button>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Coat_of_arms_of_Chhattisgarh.svg/300px-Coat_of_arms_of_Chhattisgarh.svg.png"
            alt="Website Logo"
            className="w-36 md:w-48"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            All Available Jobs
          </h1>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <select
            className="p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value="">All Division</option>
            {Division.map((id) => (
              <option value={id} key={id}>
                Division {id}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
          >
            <option value="">All Colleges</option>
            {searchCollege.map((college, index) => (
              <option value={college} key={index}>
                {college}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded-md"
            value={serachSubject}
            onChange={(e) => setSerachSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subject.map((subjectItem) => (
              <option value={subjectItem.subject_name}>
                {subjectItem.subject_name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {currentJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md relative"
            >
              <div className="">
                <button className="" onClick={() => handleModal(job)}>
                  show model
                </button>
              </div>
              <div className="flex items-center mt-2 absolute right-3">
                <a
                  href={job.job_desc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <FaFile size={25} />
                </a>
              </div>
              <h2 className="text-xl font-medium mb-2">
                Vacancy -
                <span className="text-lg">
                  {job.vacancy_details[0].subject_name}
                </span>
              </h2>

              <p className="text-gray-600 mb-1 text-lg">
                Vacancy Count: {job.vacancy_details[0].vacancy_count}
              </p>
              <p className="text-gray-600 mb-1 text-lg">
                Division: {job.college_division}
              </p>
              <p className="text-gray-600 mb-1 text-lg">
                City/District: {job.college_district}
              </p>
              <p className="text-gray-600 mb-1 text-lg">
                College Name: {job.college_name}
              </p>
              <p className="text-gray-600 mb-1 text-lg">
                Last Date :
                {dayjs(job.vacancy_details[0].apply_last_date).format(
                  "YYYY-MM-DD"
                )}
              </p>
              <div className="">
                <h1 className="text-[18px]">Contact -</h1>
                <p className="text-gray-600 mb-1 text-lg">
                  Name : {job.point_of_contact.poc_full_name}
                </p>
                <p className="text-gray-600 mb-1 text-lg ">
                  Phone : {job.point_of_contact.poc_mobile_number}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          {Array.from(
            { length: Math.ceil(jobs.length / jobsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
        {showModal && <PopUp modalData={modalData} handleClose={closeModal} />}
      </div>
    </section>
  );
};

export default Jobs;
