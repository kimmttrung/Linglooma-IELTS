import DashboardHeader from "./Dashboard-header";


const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                    <DashboardHeader />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <div className="lg:col-span-2">
                            {/* <DaySelector />
                            <StudyPlanner /> */}
                        </div>
                        <div className="space-y-6">
                            {/* <Calendar />
                            <RecentActivity /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;