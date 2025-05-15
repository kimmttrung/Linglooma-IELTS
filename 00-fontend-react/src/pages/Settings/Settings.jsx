import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <div className="flex items-center space-x-2">
            <img src="/images/img_animenamngau001fotor20250511114918_1.png" alt="" height={"40"} width={"40"} />
            <span className="text-sm font-medium text-gray-700">Detina</span>
          </div>
        </div>

        <div className="bg-pink-200 p-10 rounded-xl shadow-md grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button className="bg-white rounded-md py-4 font-semibold shadow hover:shadow-lg transition">
            Thông tin cá nhân
          </button>
          <button className="bg-white rounded-md py-4 font-semibold shadow hover:shadow-lg transition">
            Thay đổi thông tin
          </button>
          <button className="bg-white rounded-md py-4 font-semibold shadow hover:shadow-lg transition">
            Đổi mật khẩu
          </button>
          <button className="bg-white rounded-md py-4 font-semibold shadow hover:shadow-lg transition">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
