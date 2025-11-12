import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState({
    profileImage: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    role: "",
    bio: "",
  });
  const [originalUser, setOriginalUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("user")) || {};
      setUser(savedUser);
      setOriginalUser(savedUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle input changes with localStorage auto-save
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Upload profile image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_profile");
    formData.append("folder", "profile/image");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmtgrhnzl/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (res.ok) {
        const updatedUser = { ...user, profileImage: data.secure_url };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("✅ Profile image uploaded successfully!");
      } else {
        console.error("Upload Error:", data);
        alert("❌ Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    const updatedUser = { ...user, profileImage: "" };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Save profile changes to backend
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not authenticated!");

      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile");
      } else {
        console.error("Update failed:", data);
        alert(data.message || "❌ Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Edit Your Profile
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                {user.fullName
                  ?.split(" ")
                  .map((w) => w[0]?.toUpperCase())
                  .join("")}
              </div>
            )}

            <div className="flex gap-4">
              <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                {isUploading ? "Uploading..." : "Choose File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {user.profileImage && (
                <button
                  onClick={handleRemoveImage}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" name="fullName" value={user.fullName} onChange={handleChange} />
            <Input label="Email" name="email" value={user.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={user.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dob" type="date" value={user.dob} onChange={handleChange} />
            <Select label="Gender" name="gender" value={user.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
            <Input label="Role" name="role" value={user.role} onChange={handleChange} />
            <Input label="Address" name="address" value={user.address} onChange={handleChange} />
          </div>

          {/* Bio */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={user.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400 resize-none"
              placeholder="Write something about yourself..."
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-5 py-2 rounded-md transition ${
                hasChanges
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400"
        required
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400"
        required
      >
        <option value="">Choose {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
