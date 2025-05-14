import { Link } from "react-router-dom"

export default function SidebarLink({ href, icon, children, active }) {
    return (
        <li>
            <Link
                to={href}
                className={`flex items-center px-4 py-3 text-sm ${active ?
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