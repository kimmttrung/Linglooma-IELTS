import React from "react";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";

const SettingsPage = () => {
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
                <h1 className="text-xl font-semibold leading-7">Welcome, Detina</h1>
                <p className="text-gray-600">Sat, 17 May 2025</p>
              </div>
              <div className="flex gap-4 items-center">
                <button className="px-4 py-2 rounded-lg bg-[pink-100]">
                  Đăng xuất
                </button>
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
