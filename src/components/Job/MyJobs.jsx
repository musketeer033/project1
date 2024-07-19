import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar"; // Adjust the import path as per your file structure
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

function VacancyForm() {
  const { user } = useContext(Context); // Assuming you have a Context provider that provides user data
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVacancy, setIsVacancy] = useState(null);
  const [contactPerson, setContactPerson] = useState({
    name: "",
    contactInfo: "",
  });
  const [vacancies, setVacancies] = useState([
    {
      subject_id: "",
      subject_name: "",
      vacancy_title: "Atithi Vakhyakar",
      is_vacancy: isVacancy,
      vacancy_count: 0,
      apply_last_date: "",
      job_desc: "",
    },
  ]); // Initial state with one vacancy
  const [showForm, setShowForm] = useState(false); // State for showing form

  const handleContactChange = (field, value) => {
    setContactPerson({ ...contactPerson, [field]: value });
  };

  useEffect(() => {
    fetchAdminId();
    fetchSubjects();
  }, []);

  const fetchAdminId = () => {
    const storedAdminId = localStorage.getItem("adminId");
    if (storedAdminId) {
      setAdminId(storedAdminId);
      console.log(storedAdminId);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://vacancy.adnan-qasim.me/job/get-all-subjects",
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setSubjects(response.data); // Update subjects state with fetched data
    } catch (error) {
      console.log(error); // Update error state
    }
  };

  const handleAddVacancy = () => {
    setVacancies([
      ...vacancies,
      {
        subject_id: "",
        subject_name: "",
        vacancy_title: "Atithi Vakhyakar",
        is_vacancy: isVacancy,
        vacancy_count: 0,
        apply_last_date: "",
        job_desc: "",
      },
    ]);
  };

  const handleRemoveVacancy = (index) => {
    const updatedVacancies = [...vacancies];
    updatedVacancies.splice(index, 1);
    setVacancies(updatedVacancies);
  };

  const handleVacancyChange = (index, field, value) => {
    const updatedVacancies = [...vacancies];
    if (field === "subject") {
      updatedVacancies[index].subject_id = value.id;
      updatedVacancies[index].subject_name = value.name;
    } else {
      updatedVacancies[index][field] = value;
    }
    setVacancies(updatedVacancies);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update file state when a file is selected
  };

  const handleLogout = () => {
    navigate("/login");
    console.log("Navigating to login page");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Basic validation
    console.log(contactPerson.name, contactPerson.contactInfo, vacancies);

    if (
      !contactPerson.name ||
      !contactPerson.contactInfo ||
      vacancies.some(
        (vacancy) =>
          !vacancy.subject_id ||
          !vacancy.vacancy_title ||
          !vacancy.apply_last_date ||
          vacancy.vacancy_count <= 0
      )
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Prepare data to send to API
    const data = {
      college_state: "string",
      college_division: 0,
      college_district: "string",
      college_name: "string",
      vacancy_details: vacancies.map((vacancy) => ({
        subject_id: vacancy.subject_id,
        subject_name: vacancy.subject_name,
        vacancy_title: vacancy.vacancy_title,
        is_vacancy: true,
        vacancy_count: Number(vacancy.vacancy_count), // Ensure this is a number
        apply_last_date: vacancy.apply_last_date,
      })),
      point_of_contact: {
        poc_full_name: contactPerson.name,
        poc_mobile_number: contactPerson.contactInfo,
      },
      job_desc: "string",
    };

    console.log(data);

    // API request using Axios
    try {
      const response = await axios.post(
        "https://vacancy.adnan-qasim.me/job/post-vacancy",
        data,
        {
          params: { clg_admin_id: adminId },
          headers: { "Content-Type": "application/json" },
        }
      );

      const jobId = response.data.job_id; // Assume response contains job_id
      console.log(response.data); // Log the response data

      // Optionally handle success - e.g., show success message, redirect, etc.
      if (jobId && file) {
        await handleFileSubmit(jobId);
      } else {
        toast.success(response.data.message);
      }
      setContactPerson({
        name: "",
        contactInfo: "",
      });
      setVacancies([
        {
          subject_id: "",
          subject_name: "",
          vacancy_title: "",
          is_vacancy: "",
          vacancy_count: 0,
          apply_last_date: "",
          job_desc: "",
        },
      ]);
      setShowForm(false);
      setIsVacancy(false);
      setLoading(false);
    } catch (error) {
      console.error("Error posting vacancy:", error);
      // Optionally handle error - e.g., show error message
    }
  };

  const handleFileSubmit = async (jobId) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file); // Append the selected file to FormData

    const options = {
      method: "POST",
      url: "https://vacancy.adnan-qasim.me/job/post-vacancy-file",
      params: { clg_admin_id: adminId, job_id: jobId }, // Replace with actual IDs
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data); // Log the response data
      setFile(null);
      toast.success("Job Vacancy Doc Created Successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error - e.g., show error message, retry upload
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user, "data from context API");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />

      <div className="flex items-center justify-center min-h-full pb-20 ">
        <div className="p-6 max-w-lg w-full bg-slate-100 rounded-xl border border-blue-700 mx-4 ">
          <div className="text-center mb-">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Vacancy
              </button>
            ) : (
              <form className="relative" onSubmit={handleSubmit}>
                <div className="absolute right-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    // htmlFor={`vacancyTitle-${index}`}
                    className="block  font-semibold text-md text-start text-gray-700"
                  >
                    Vacancy Title:
                  </label>
                  <h1 className="text-sm text-start ">Atithi Vakhyakar</h1>
                  {/* <input
                        type="text"
                        id={`vacancyTitle-${index}`}
                        name={`vacancyTitle-${index}`}
                        placeholder="vacancy title"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={vacancy.vacancy_title}
                        onChange={(e) =>
                          handleVacancyChange(
                            index,
                            "vacancy_title",
                            e.target.value
                          )
                        }
                      /> */}
                </div>
                <div className="mb-4">
                  <label className="block  font-semibold text-md text-start  text-gray-700">
                    Do you have vacancy?
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <input
                        type="radio"
                        value="yes"
                        // name={`vacancy-${index}`}
                        checked={isVacancy === "yes"}
                        onChange={() => setIsVacancy("yes")}
                      />
                      <label
                        // htmlFor={`yes-${index}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="no"
                        // name={`vacancy-${index}`}
                        checked={isVacancy === "no"}
                        onChange={() => setIsVacancy("no")}
                      />
                      <label
                        // htmlFor={`no-${index}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {isVacancy === "yes" && (
                  <div className="">
                    {vacancies.map((vacancy, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <div key={index} className="mb-4">
                            <label
                              htmlFor={`subject-${index}`}
                              className="block   font-semibold text-md text-start text-gray-700"
                            >
                              Subject:
                            </label>
                            <select
                              id={`subject_name-${index}`}
                              name={`subject_name-${index}`}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={vacancy.subject_name}
                              onChange={(e) => {
                                const selectedSubject = subjects.find(
                                  (subject) =>
                                    subject.subject_name === e.target.value
                                );
                                handleVacancyChange(index, "subject", {
                                  id: selectedSubject?.id || "",
                                  name: selectedSubject?.subject_name || "",
                                });
                              }}
                            >
                              <option value="" className="hidden">
                                Select subject
                              </option>
                              {subjects.map((subject) => (
                                <option
                                  key={subject.id}
                                  value={subject.subject_name}
                                >
                                  {subject.subject_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor={`vacancyCount-${index}`}
                            className="block  font-semibold text-md text-start  text-gray-700"
                          >
                            Vacancy Count:
                          </label>
                          <input
                            type="number"
                            id={`vacancyCount-${index}`}
                            name={`vacancyCount-${index}`}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={vacancy.vacancy_count}
                            onChange={(e) =>
                              handleVacancyChange(
                                index,
                                "vacancy_count",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor={`lastDate-${index}`}
                            className="block  font-semibold text-md text-start text-gray-700"
                          >
                            Last Date to Apply:
                          </label>
                          <input
                            type="date"
                            id={`apply_last_date-${index}`}
                            name={`apply_last_date-${index}`}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={vacancy.apply_last_date}
                            onChange={(e) =>
                              handleVacancyChange(
                                index,
                                "apply_last_date",
                                e.target.value
                              )
                            }
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
                    <div className="text-center mb-4">
                      <button
                        type="button"
                        onClick={handleAddVacancy}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add Another Vacancy
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block  text-start  font-semibold text-md text-gray-700">
                        Upload Vacancy PDF :
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-start   font-semibold text-md text-gray-700">
                        Contact Person :
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
                        placeholder="Phone Number"
                        value={contactPerson.contactInfo}
                        onChange={(e) =>
                          handleContactChange("contactInfo", e.target.value)
                        }
                      />
                    </div>

                    {loading ? (
                      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Vacancies
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add Vacancies
                      </button>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacancyForm;
