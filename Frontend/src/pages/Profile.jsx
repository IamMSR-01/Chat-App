import React, { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ avatar: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl p-8 sm:p-10 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={
                selectedImage || authUser.avatar ||
                `https://ui-avatars.com/api/?name=${authUser.fullName
                  .trim()
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0].toUpperCase())
                  .join(" ")}`
              }
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-1 right-0 cursor-pointer w-32 h-32 rounded-full shadow-lg transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="absolute w-8 h-8 bottom-0 right-1" />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div className="flex items-center text-center gap-2 mt-4">
            <User />
            <h2 className="text-2xl font-semibold">{authUser.fullName}</h2>
          </div>
          <div className="flex items-center text-center gap-2">
          <Mail />
          <p className=" text-sm">{authUser.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6 rounded-lg bg-white/10 p-6 shadow-lg">
          <h2 className="flex justify-center text-xl font-bold text-yellow-500">
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span>Member Since</span>
              <span className="text-gray-300">
                {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span>Account Status</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
