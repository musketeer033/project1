import React, { useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs] = useState([
    {
      _id: "1",
      title: "Software Engineer",
      category: "Technology",
      country: "United States",
      vacancyCount: 5,
      division: "Engineering",
      city: "San Francisco",
      collegeName: "University of California",
      lastDate: "2024-08-31",
      poc: "John Doe",
      pdfLink: "/path/to/pdf",
    },
    {
      _id: "2",
      title: "Marketing Specialist",
      category: "Marketing",
      country: "Canada",
      vacancyCount: 3,
      division: "Marketing",
      city: "Toronto",
      collegeName: "University of Toronto",
      lastDate: "2024-09-15",
      poc: "Jane Smith",
      pdfLink: "/path/to/pdf",
    },
    {
      _id: "3",
      title: "Financial Analyst",
      category: "Finance",
      country: "United Kingdom",
      vacancyCount: 2,
      division: "Finance",
      city: "London",
      collegeName: "London School of Economics",
      lastDate: "2024-08-20",
      poc: "Michael Johnson",
      pdfLink: "/path/to/pdf",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? job.category === filterCategory : true) &&
      (filterCountry ? job.country === filterCountry : true)
    );
  });

  return (
    <section className="jobs page bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Coat_of_arms_of_Chhattisgarh.svg/300px-Coat_of_arms_of_Chhattisgarh.svg.png"
            alt="Website Logo"
            className="w-36 md:w-48"
          />
          <h1 className="text-3xl font-bold text-gray-800">All Available Jobs</h1>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-1">Vacancy Count: {job.vacancyCount}</p>
              <p className="text-gray-600 mb-1">Division: {job.division}</p>
              <p className="text-gray-600 mb-1">City/District: {job.city}</p>
              <p className="text-gray-600 mb-1">College Name: {job.collegeName}</p>
              <p className="text-gray-600 mb-1">Last Date: {job.lastDate}</p>
              <div className="flex items-center mt-2">
                <Link
                  to={`/job/${job._id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  View Details
                </Link>
                <a
                  href={job.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
