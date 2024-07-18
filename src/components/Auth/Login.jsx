import { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { BsBuildings } from "react-icons/bs";
import { TbBuildingBank } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState({});
  const [collegeData, setCollegeData] = useState([]);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data from context api", user);
  }, [user]);

  useEffect(() => {
    const fetchDistrictAndCollegeOptions = async () => {
      try {
        const response = await axios.get(
          "https://vacancy.adnan-qasim.me/college/get-all-colleges"
        );
        setCollegeData(response.data);
        const groupedData = response.data.reduce((acc, item) => {
          const key = `${item.district_name} - Division ${item.division}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item.institute_name);
          return acc;
        }, {});

        setDistrictOptions(Object.keys(groupedData));
        setCollegeOptions(groupedData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch districts and colleges");
      }
    };

    fetchDistrictAndCollegeOptions();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!selectedDistrict || !selectedCollege) {
        toast.error("Please select District/Division and College");
        return;
      }

      const selectedCollegeObject = collegeData.find((item) => {
        const key = `${item.district_name} - Division ${item.division}`;
        return (
          key === selectedDistrict && item.institute_name === selectedCollege
        );
      });

      if (!selectedCollegeObject) {
        toast.error("Selected college data not found");
        return;
      }

      // Store the found object in context
      // setContextSelectedCollege(selectedCollegeObject);
      setUser(selectedCollegeObject);
      console.log(selectedCollegeObject);

      const options = {
        method: "GET",
        url: "https://vacancy.adnan-qasim.me/college/college-admin-login",
        params: { phone: password, email: email },
      };

      const { data } = await axios.request(options);
      localStorage.setItem("adminId", data.clg_admin_id);
      toast.success("Login successful!");
      navigate("/vacancy");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in");
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="flex flex-col justify-center items-center mb-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Coat_of_arms_of_Chhattisgarh.svg/300px-Coat_of_arms_of_Chhattisgarh.svg.png"
              alt="Website Logo"
              className="w-36 md:w-48"
            />
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedCollege("");
                  }}
                >
                  <option value="">Select District/Division</option>
                  {districtOptions.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <TbBuildingBank />
              </div>
              <div className="h-2"></div>
              <div className="">
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select College</option>
                  {selectedDistrict &&
                    collegeOptions[selectedDistrict].map((college, index) => (
                      <option key={index} value={college}>
                        {college}
                      </option>
                    ))}
                </select>
                <BsBuildings />
              </div>
            </div>

            {selectedDistrict && selectedCollege && (
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
                <button type="submit">Login</button>
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
