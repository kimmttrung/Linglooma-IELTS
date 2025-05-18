import React from "react";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";   // fallback nếu không có name
  const email = user?.email || "";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className="bg-emerald-50 min-h-[screen]">
        <div className="flex">
          <div className="flex-1 p-8">
            <header className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-semibold leading-7">Welcome, {name}</h1>
                <p className="text-gray-600">{new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}</p>
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  className="px-4 py-2 rounded-lg bg-[pink-100]"
                  onClick={() => navigate("/")}
                >
                  Đăng xuất
                </Button>
                <div className="overflow-hidden w-10 h-10 rounded-full">
                  <img
                    src="/images/Profile1.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </header>
            <div className="flex gap-8">
              <ProfileSettingsForm />
              <PasswordSettingsForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
