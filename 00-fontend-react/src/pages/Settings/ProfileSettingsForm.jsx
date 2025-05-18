import React from 'react';
import { FcPlus } from "react-icons/fc";

function ProfileSettingsForm() {
    return (
        <section className="flex-1">
            <article className="p-6 mb-6 bg-white rounded-lg">
                <div className="flex gap-4 items-center mb-6">
                    <div className="overflow-hidden w-12 h-12 rounded-full">
                        <img
                            src="/images/Profile1.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold">Detina</h2>
                        <p className="text-gray-600">alexarawles@gmail.com</p>
                    </div>
                </div>
                <form className="gap-y-6">
                    <div className="mb-6">
                        <label htmlFor="fullName" className="block mb-2">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value="Detina"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block mb-2">Gender</label>
                        <div className="relative">
                            <select id="gender" className="p-3 w-full bg-white rounded-lg border border-solid appearance-none">
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                            <i className="ti ti-chevron-down absolute right-3 top-2/4 -translate-y-2/4" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="language" className="block mb-2">Language</label>
                        <div className="relative">
                            <select id="language" className="p-3 w-full bg-white rounded-lg border border-solid appearance-none">
                                <option>English</option>
                                <option>Vietnam</option>
                                <option>Japan</option>
                            </select>
                            <i className="ti ti-chevron-down absolute right-3 top-2/4 -translate-y-2/4" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 mt-10">My email Address</label>
                        <div className="flex gap-5 items-center mb-2">
                            <i className="ti ti-mail text-blue-500" />
                            <span>Detina@gmail.com</span>
                            <span className="text-sm leading-5 text-gray-500">1 month ago</span>
                        </div>
                        <button type="button" className="text-blue-500 flex justify-content-center items-center gap-2">
                            <FcPlus />
                            Add Email Address
                        </button>
                    </div>
                </form>
            </article>
        </section>
    );
}

export default ProfileSettingsForm;
