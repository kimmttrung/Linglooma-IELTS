import { Link, useLocation } from "react-router-dom"

export default function SidebarLink({ href, icon, children }) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <li>
            <Link
                to={href}
                className={`flex items-center px-4 py-3 text-sm ${isActive
                    ?
                    "bg-blue-600 text-white"
                    :
                    "text-gray-300 hover:bg-slate-700"
                    }`}
            >
                <span className="mr-3">{icon}</span>
                <span>{children}</span>
            </Link>
        </li>
    )
}