const DashboardHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Student</h1>
            <div className="flex justify-content-center items-center gap-3  ">
                <div>
                    <img src="/images/img_animenamngau001fotor20250511114918_1.png" alt="" height={"40"} width={"40"} />
                </div>
                <label htmlFor="" className="mr-4">Detina</label>
            </div>
        </div>
    )
}

export default DashboardHeader;