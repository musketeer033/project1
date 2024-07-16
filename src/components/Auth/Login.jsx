import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { BsBuildings } from "react-icons/bs";
import { TbBuildingBank } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role1, setRole1] = useState("");
  const [role2, setRole2] = useState("");


  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "https://jobdekho-wkbb.onrender.com/api/v1/user/login",
  //       { email, password, role },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     toast.success(data.message);
  //     setEmail("");
  //     setPassword("");
  //     setRole("");
  //     setIsAuthorized(true);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  // if(isAuthorized){
  //   return <Navigate to={'/'}/>
  // }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label className="">Login As</label>

              <div>
                <select value={role1} onChange={(e) => setRole1(e.target.value)}>
                  <option value="">Select District/Division</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <TbBuildingBank/>
              </div>
              <div className="h-2"></div>
              <div className="">
                <select value={role2} onChange={(e) => setRole2(e.target.value)}>
                  <option value="">Select College</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <BsBuildings/>
              </div>
            </div>

            {(role1.length !== 0 && role2.length !== 0) && (
              <>
                <div className="inputTag">
                  <label>Email Address</label>
                  <div>
                    <input
                      type="email"
                      placeholder="zk@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdOutlineMailOutline />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Mobile</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Your number"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <RiLock2Fill />
                  </div>
                </div>
                <button type="submit">
                  Login
                </button>
              </>
            )}
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;