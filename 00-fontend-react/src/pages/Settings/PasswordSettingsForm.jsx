import React from 'react';

function PasswordSettingsForm() {
    return (
        <section className="flex-1">
            <button className="py-3 mb-6 w-full font-medium text-indigo-600 bg-violet-100 rounded-lg">
                Change Password
            </button>
            <article className="p-6 bg-white rounded-lg">
                <form className="gap-y-6">
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2">User Name</label>
                        <input
                            type="text"
                            id="username"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Current Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="genderInput" className="block mb-2">Gender</label>
                        <input
                            type="text"
                            id="genderInput"
                            className="p-3 w-full rounded-lg border border-solid"
                            section=""
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="languageInput" className="block mb-2">Nationality</label>
                        <input
                            type="text"
                            id="languageInput"
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <button type="submit" className="py-3 w-full text-white bg-blue-500 rounded-lg">
                        Save
                    </button>
                </form>
            </article>
        </section>
    );
}

export default PasswordSettingsForm;
