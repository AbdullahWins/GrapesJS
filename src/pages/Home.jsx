

const Home = () => {
    return (
        <div className="flex items-center justify-center gap-12 min-h-screen">
            <a href="/drag">
                <div className="h-24 w-24 bg-gray-200 flex items-center justify-center rounded-xl border-2 border-gray-300">
                    <p className="font-bold">ToDo List</p>
                </div>
            </a>
            <a href="/grapes">
                <div className="h-24 w-24 bg-gray-200 flex items-center justify-center rounded-xl border-2 border-gray-300">
                    <p className="font-bold">GrapesJs</p>
                </div>
            </a>
        </div>
    );
};

export default Home;