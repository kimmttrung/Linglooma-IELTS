// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//     const rawUser = JSON.parse(localStorage.getItem("user") || "{}");

//     // Chuẩn hóa object user từ localStorage
//     const normalizedUser = {
//         username: rawUser.username || "User",
//         email: rawUser.email || "",
//         phonenumber: rawUser.phonenumber || "",
//         gender: rawUser.gender || "Female",
//         nationality: rawUser.nationality || "English"
//     };

//     const [user, setUser] = useState(normalizedUser);

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify(user));
//     }, [user]);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
