import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar"; // Adjust the import path as per your file structure
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

function VacancyForm() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [contactPerson, setContactPerson] = useState({
    name: "",
    contactInfo: "",
  });
  const [vacancies, setVacancies] = useState([
    { subject: "hindi", count: 0, lastDate: "", pdf: null },
  ]); // Initial state with one vacancy
  const [showForm, setShowForm] = useState(false); // State for showing form

  const handleContactChange = (field, value) => {
    setContactPerson({ ...contactPerson, [field]: value });
  };

  const handleAddVacancy = () => {
    setVacancies([
      ...vacancies,
      { subject: "hindi", count: 0, lastDate: "", pdf: null },
    ]);
  };

  const handleRemoveVacancy = (index) => {
    const updatedVacancies = [...vacancies];
    updatedVacancies.splice(index, 1);
    setVacancies(updatedVacancies);
  };

  const handleVacancyChange = (index, field, value) => {
    const updatedVacancies = [...vacancies];
    updatedVacancies[index][field] = value;
    setVacancies(updatedVacancies);
  };

  const handlePdfChange = (index, e) => {
    const updatedVacancies = [...vacancies];
    updatedVacancies[index].pdf = e.target.files[0];
    setVacancies(updatedVacancies);
  };

  const handleLogout = () => {
    navigate("/login");
    console.log("Navigating to login page");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to API
    const formData = new FormData();
    formData.append("college_state", "string"); // Replace with actual value
    formData.append("college_division", "string"); // Replace with actual value
    formData.append("college_district", "string"); // Replace with actual value
    formData.append("college_city", "string"); // Replace with actual value
    formData.append("college_name", "string"); // Replace with actual value

    vacancies.forEach((vacancy, index) => {
      formData.append(`vacancy_details[${index}][subject_id]`, vacancy.subject);
      formData.append(
        `vacancy_details[${index}][vacancy_title]`,
        "Atithi Vyakhakar" // Replace with actual vacancy title
      );
      formData.append(`vacancy_details[${index}][is_vacancy]`, true);
      formData.append(
        `vacancy_details[${index}][vacancy_count]`,
        vacancy.count
      );
      formData.append(
        `vacancy_details[${index}][apply_last_date]`,
        vacancy.lastDate
      );
      formData.append(`vacancy_details[${index}][vacancy_pdf]`, vacancy.pdf);
    });

    formData.append(
      "point_of_contact",
      JSON.stringify({
        poc_full_name: contactPerson.name,
        poc_mobile_number: contactPerson.contactInfo,
      })
    );
    formData.append("job_desc", "string"); // Replace with actual job description

    // API request using Axios
    try {
      const response = await axios.post(
        "https://vacancy.adnan-qasim.me/job/post-vacancy",
        formData,
        {
          params: {
            clg_admin_id: "string", // Replace with actual clg_admin_id
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Log the response data
      // Optionally handle success - e.g., show success message, redirect, etc.
    } catch (error) {
      console.error("Error posting vacancy:", error);
      // Optionally handle error - e.g., show error message
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user, "data form context api");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />

      <div className="flex items-center justify-center min-h-full">
        <div className="p-6 max-w-lg w-full bg-slate-100 rounded-xl shadow-md">
          <div className="text-center mb-4">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Vacancy
              </button>
            ) : (
              <form onSubmit={handleSubmit}>
                {vacancies.map((vacancy, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor={`subject-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject:
                      </label>
                      <select
                        id={`subject-${index}`}
                        name={`subject-${index}`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={vacancy.subject}
                        onChange={(e) =>
                          handleVacancyChange(index, "subject", e.target.value)
                        }
                      >
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                        {/* Add more subjects as needed */}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor={`vacancyCount-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Vacancy Count:
                      </label>
                      <input
                        type="number"
                        id={`vacancyCount-${index}`}
                        name={`vacancyCount-${index}`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={vacancy.count}
                        onChange={(e) =>
                          handleVacancyChange(index, "count", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor={`lastDate-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Date to Apply:
                      </label>
                      <input
                        type="date"
                        id={`lastDate-${index}`}
                        name={`lastDate-${index}`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={vacancy.lastDate}
                        onChange={(e) =>
                          handleVacancyChange(index, "lastDate", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Vacancy PDF
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => handlePdfChange(index, e)}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVacancy(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove Vacancy
                      </button>
                    )}
                  </div>
                ))}
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
                <div className="text-center mb-4">
                  <button
                    type="button"
                    onClick={handleAddVacancy}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Another Vacancy
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Vacancies
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacancyForm;
