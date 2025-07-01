"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "../../../src/api/auth";

export default function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    currentRole: "",
    company: "",
    location: "",
    bio: "",
    profilePicture: "",  // ✅ added
  });

  const [userId, setUserId] = useState(null);
  const router = useRouter(); // for redirecting

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const id = storedUser?.id;
    if (!id) {
      console.error("User ID not found in localStorage");
      return;
    }
    setUserId(id);

    const fetchUser = async () => {
      try {
        const data = await getUserProfile(id);
        setUser(data);
        setFormData({
          fullName: data.fullName || "",
          currentRole: data.currentRole || "",
          company: data.company || "",
          location: data.location || "",
          bio: data.bio || "",
           profilePicture: data.profilePicture || "",  // ✅ added
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      router.push("/profile"); // redirect to profile page
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <div className="text-center mt-20 animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800 py-12 px-4 animate-fade-in">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-in-up">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-center mb-6">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Full Name</label>
            <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Role</label>
            <Input type="text" name="currentRole" value={formData.currentRole} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Company</label>
            <Input type="text" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Location</label>
            <Input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows="4"
            />
          </div>
          <div>
  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Profile Picture</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }}
    className="block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 p-2"
  />
  {formData.profilePicture && (
    <img
      src={formData.profilePicture}
      alt="Profile Preview"
      className="mt-4 h-24 w-24 object-cover rounded-full border border-gray-300 dark:border-gray-600"
    />
  )}
</div>


          <div className="flex justify-between items-center gap-4">
            <Button
              type="button"
              onClick={() => router.push("/profile")}
              className="w-1/2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:scale-105 transition"
            >
              Back to Profile
            </Button>
            <Button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
