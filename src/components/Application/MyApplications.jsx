import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user && user.role === "Employer") {
      setApplications(dummyEmployerData);
    } else {
      setApplications(dummyJobSeekerData);
    }
  }, [user]);


  const deleteApplication = (id) => {
    setApplications((prevApplications) =>
      prevApplications.filter((application) => application._id !== id)
    );
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};

// Dummy data for testing
const dummyJobSeekerData = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    coverLetter: "I am very interested in this job opportunity.",
    resume: { url: "https://via.placeholder.com/150" },
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    address: "456 Elm St, Othertown, USA",
    coverLetter: "I believe I am a great fit for this position.",
    resume: { url: "https://via.placeholder.com/150" },
  },
];

const dummyEmployerData = [
  {
    _id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "111-222-3333",
    address: "789 Pine St, Anycity, USA",
    coverLetter: "I have the skills and experience required for this role.",
    resume: { url: "https://via.placeholder.com/150" },
  },
  {
    _id: "2",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "444-555-6666",
    address: "321 Oak St, Sometown, USA",
    coverLetter: "I am excited about the possibility of joining your team.",
    resume: { url: "https://via.placeholder.com/150" },
  },
];
