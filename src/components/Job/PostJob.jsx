import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../main";

const PostJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryType: "default",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
  });

  const { isAuthorized, user } = useContext(Context);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleSalaryTypeChange = (e) => {
    const salaryType = e.target.value;
    setJobDetails({
      ...jobDetails,
      salaryType,
      fixedSalary: "",
      salaryFrom: "",
      salaryTo: "",
    });
  };

  const handleJobPost = (e) => {
    e.preventDefault();
    const { salaryType, fixedSalary, salaryFrom, salaryTo } = jobDetails;
    // Example validation (you can adjust as per your needs)
    if (salaryType === "Fixed Salary" && !fixedSalary) {
      toast.error("Please enter Fixed Salary");
      return;
    }
    if (salaryType === "Ranged Salary" && (!salaryFrom || !salaryTo)) {
      toast.error("Please enter Salary Range");
      return;
    }
    // Submit logic goes here (e.g., API call)
    toast.success("Job posted successfully!");
  };

  return (
    <div className="h-[50%] bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Post a New Job
        </h2>
        <form className="space-y-4" onSubmit={handleJobPost}>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={jobDetails.title}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Job Title"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={jobDetails.category}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              {/* Add more categories */}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={jobDetails.country}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Country"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={jobDetails.city}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={jobDetails.location}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Location"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="salaryType"
              className="block text-sm font-medium text-gray-700"
            >
              Salary Type
            </label>
            <select
              id="salaryType"
              name="salaryType"
              value={jobDetails.salaryType}
              onChange={handleSalaryTypeChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
          </div>
          {jobDetails.salaryType === "Fixed Salary" && (
            <div className="space-y-2">
              <label
                htmlFor="fixedSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Fixed Salary
              </label>
              <input
                id="fixedSalary"
                name="fixedSalary"
                type="number"
                value={jobDetails.fixedSalary}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Fixed Salary"
              />
            </div>
          )}
          {jobDetails.salaryType === "Ranged Salary" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="salaryFrom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary From
                </label>
                <input
                  id="salaryFrom"
                  name="salaryFrom"
                  type="number"
                  value={jobDetails.salaryFrom}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Salary From"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="salaryTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary To
                </label>
                <input
                  id="salaryTo"
                  name="salaryTo"
                  type="number"
                  value={jobDetails.salaryTo}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Salary To"
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={jobDetails.description}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Job Description"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
