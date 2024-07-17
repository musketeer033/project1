import React, { useState } from "react";
import Navbar from "./Navbar"; // Adjust the import path as per your file structure
import { Link, Navigate, useNavigate } from "react-router-dom";
function VacancyForm() {
  const [hasVacancy, setHasVacancy] = useState(false);
  const navigate = useNavigate();
  const [contactPerson, setContactPerson] = useState({
    name: "",
    contactInfo: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleContactChange = (field, value) => {
    setContactPerson({ ...contactPerson, [field]: value });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddVacancy = () => {
    setShowForm(true);
  };

  const handleLogout = () => {
    navigate("/login")
    console.log("Navigating to login page");
  };

  return (
    <div className="min-h-screen">
      <Navbar onLogout={handleLogout} />

      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="p-6 max-w-lg w-full bg-white rounded-xl shadow-md">
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
          {!showForm && (
            <div className="text-center mb-4">
              <button
                onClick={handleAddVacancy}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Vacancy
              </button>
            </div>
          )}
          {showForm && (
            <form>
              <div className="mb-4">
                <p className="block text-lg font-medium text-gray-700">
                  Job Title: Atithi Vyakhakar
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Do you have vacancies?
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setHasVacancy(e.target.value === "yes")}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {hasVacancy && (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject:
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="hindi">Hindi</option>
                      <option value="english">English</option>
                      {/* Add more subjects as needed */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="vacancyCount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vacancy Count:
                    </label>
                    <input
                      type="number"
                      id="vacancyCount"
                      name="vacancyCount"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Date to Apply:
                    </label>
                    <input
                      type="date"
                      id="lastDate"
                      name="lastDate"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Name"
                      value={contactPerson.name}
                      onChange={(e) =>
                        handleContactChange("name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Contact Information"
                      value={contactPerson.contactInfo}
                      onChange={(e) =>
                        handleContactChange("contactInfo", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Vacancy
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default VacancyForm;
