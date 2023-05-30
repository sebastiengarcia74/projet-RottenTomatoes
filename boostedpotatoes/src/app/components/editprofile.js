"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function editProfile ({userData, onUserDataUpdate}) {

  // const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const user = Cookies.get("userId");
    // console.log(user);
    setUserId(user);
}, []);

  useEffect(() => {
    setUsername(userData?.username);
    setEmail(userData?.email);
  }, [userData]);

// useEffect(() => {
//   const fetchData = async () => {
//     if (userId) {
//       try {
//           const user = Cookies.get("userId");
//           const response = await axios.get(`http://localhost:3001/user/${userId}`)
//           const data = await response.data[0];
//           // console.log("User data", data);
//           setUserData(data);
//           setUsername(data?.username);
//           setEmail(data?.email);
//       } catch (error) {
//           console.error("Fetch error", error);
//       }
//     }
//   };

//   fetchData();
// }, [userId]);


const handleEditProfile = async (event) => {
  event.preventDefault();
  console.log('DATA INPUT', username)
  console.log('DATA INPUT', email)
  console.log('DATA INPUT', newPassword)
 
  if (userId) {
    try {
        const response = await axios.put(`http://localhost:3001/user_update/${userId}`, {
            username,
            email,
            newPassword,
        });
       
        onUserDataUpdate();
        setModalOpen(false);
        toast.success("Profile edited successfully");
    } catch (error) {
        console.error("Fetch error", error);
        toast.error("Profile edit failed");
    }
  }
}

  return (
      <>
      <input type="checkbox" id="my-modal-editprofile" className="modal-toggle" checked={modalOpen} onChange={() => setModalOpen(!modalOpen)} />
      <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form
              onSubmit={handleEditProfile}
              >
              {" "}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder={userData?.username}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder={userData?.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="New Password"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex mt-5 justify-between">
                <label
                  htmlFor="my-modal-editprofile"
                  className="btn btn-outline btn-error"
                >Cancel</label>
                <button
                  type="submit"
                  className="btn btn-outline btn-success"
                >Save</button>
              </div>
            </form>
          </div>
      </div>
      </>
  );
}

export default editProfile;