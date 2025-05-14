import { useNavigate } from "react-router-dom";
import SidebarLink from "./sidebar-link";
import { Home, BookOpen, BarChart2, Settings } from "lucide-react";


const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-slate-800 text-white flex flex-col h-full">
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-xl font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" /> Student
                </h2>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    <SidebarLink href="/dashboard" icon={<Home className="h-5 w-5" />} active>
                        Dashboard
                    </SidebarLink>
                    <SidebarLink href="/features" icon={<BookOpen className="h-5 w-5" />}>
                        Features
                    </SidebarLink>
                    <SidebarLink href="/result-view" icon={<BarChart2 className="h-5 w-5" />}>
                        Results View
                    </SidebarLink>
                    <SidebarLink href="/login" icon={<Settings className="h-5 w-5" />}>
                        Settings
                    </SidebarLink>
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <img src="/images/img_logo_140x196.png" alt="Linglooma Logo" className="h-[140px]" />
                        </div>
                        <h3
                            className="text-xl font-bold cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Linglooma
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;