import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-blue-600">Mern Blog App</h1>
                    <nav>
                        <ul className="flex space-x-8">
                            <li>
                                <Link to={"/"} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={"/addblog"} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                    Add Blog
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}