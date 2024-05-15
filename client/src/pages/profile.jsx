import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserSuccess, // typo here, should be updateUserSucess
  updateUserStart,
  updateUserFailure,
  deleteUserSuccess, // typo here, should be deleteUserSucess
  deleteUserStart,
  deleteUserFailure
} from "../../redux/user/userSlice.js";
import { useDispatch } from 'react-redux';

export default function profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUPloadError, setFileUPloadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  console.log(formData);
  // console.log(filePerc);
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUPloadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          withCredentials: true, // should be there
          credentials: 'include'
        }
      );

      const data = await res.json(); // Wait for JSON data
      console.log("Data received:", data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      //console.log("Before dispatching updateUserSuccess");
      dispatch(updateUserSuccess(data));
     // console.log("After dispatching updateUserSuccess");
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          withCredentials: true, // should be there
          credentials: 'include'
        } );
        const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt=2"
        />
        <p className="text-sm self-center ">
          {fileUPloadError ? (
            <span className="text-red-700 ">error image upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">delete account</span>
        <span className="text-red-700 cursor-pointer">sign out</span>
      </div>
      <p className="text-red-700 mt-5 ">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 ">
        {updateSuccess ? "update successful" : ""}
      </p>
    </div>
  );
}
