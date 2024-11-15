import * as React from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Create Car', to: '/createCar' },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img src="./logo.png" className='w-20' alt="" />
                            <span className="ml-2 text-xl font-bold text-gray-800">Car Registry</span>
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative">
                                <Link
                                    to={item.to}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 px-4 pb-3">
                        {navItems.map((item) => (
                            <div key={item.name}>
                                <Link
                                    to={item.to}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                                    onClick={toggleMobileMenu}
                                >
                                    {item.name}
                                </Link>

                            </div>
                        ))}

                    </div>
                </div>
            )}
        </nav>
    )
}