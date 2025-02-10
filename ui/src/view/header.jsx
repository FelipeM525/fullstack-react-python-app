import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-100 to-slate-200 shadow-md border-b">
            <Link to="/" className="text-3xl font-bold text-gray-800 tracking-wide">
            🏡 Acomodações

            </Link>
        
            <Link
                to="/favorites"
                className="text-lg font-semibold text-gray-800 hover:text-red-500 bg-white shadow-md px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            >
                💖 Favoritos
            </Link>
        </div>
    );
};

export default Header;
