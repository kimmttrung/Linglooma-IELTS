import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const PageLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordView = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex items-center justify-center" style={{ background: "#FFFBEF" }}>
            <div className="w-[95%] max-w-xl  p-6 bg-gray-100 flex-col flex items-center gap-6 rounded-2xl shadow-slate-500 shadow-2xl">
                <h1 className="text-3xl md:text-5xl font-bold">Linglooma</h1>
                <p className="text-lg md:text-xl text-gray-600 text-center">
                    Good to see you ganin
                </p>

                <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex items-center gap-2 bg-white p-2 rounded-xl">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                        />
                    </div>

                    <div className="w-full flex items-center gap-2  p-2 bg-white rounded-xl relative">
                        <input
                            type={showPassword ? "password" : "text"}
                            placeholder="Password"
                            className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                        />
                        {showPassword ? (
                            <FaRegEyeSlash
                                className="absolute right-5 cursor-pointer"
                                onClick={togglePasswordView}
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-5 cursor-pointer"
                                onClick={togglePasswordView}
                            />
                        )}
                    </div>
                </div>

                <button
                    className="w-full p-3 bg-[#71da90] rounded-xl mt-2 hover:bg-[#0FC446] text-base md:text-sm text-white font-bold"
                    onClick={() => navigate("/dashboard")}
                >
                    Login
                </button>
                <h3 onClick={() => navigate("/")} className="cursor-pointer text-sm md:text-base mt-2">Go to home page</h3>

                <div className="w-full flex items-center justify-evenly">
                    <div className="p-1 md:px-6 lg:px-10 cursor-pointer rounded-x">
                        <a href="https://www.google.com/?hl=vi">
                            <img
                                src="/icons/google-internet.png"
                                alt=""
                                className="w-6 md:w-8"
                            />
                        </a>
                    </div>
                    <div className="p-2 md:px-6 lg:px-10 cursor-pointer rounded-xl">
                        <a href="https://www.facebook.com/">
                            <img
                                src="/icons/2023_Facebook_icon.svg.png"
                                alt="google-icon"
                                className="w-6 md:w-8"
                            />
                        </a>

                    </div>
                </div>
                <div className="relative w-full flex items-center justify-center py-3">

                    <h3 className="font-lora text-sm md:text-base px-4 text-gray-600">
                        Do you have an account ?
                    </h3>
                    <h3 className="font-lora text-sm md:text-base px-4 text-gray-600">
                        Forgot password ?
                    </h3>

                </div>
            </div>
        </div>
    )
}
export default PageLogin;