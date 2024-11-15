import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'


const CarListPage = () => {
    const [cars, setCars] = useState([])

    const token = localStorage.getItem('token')
    const [searchQuery, setSearchQuery] = useState("")


    const fetchCars = async (searchQuery = "") => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    keyword: searchQuery,
                }
            })
            console.log(response.data)
            setCars(response.data)
        } catch (error) {
            console.error("Error fetching cars:", error)
            alert("Failed to load cars")
        }
    }
    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
        fetchCars(e.target.value)
    }


    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="w-full sm:flex items-center justify-center">
                <form onSubmit={handleSearch} className="flex gap-1 items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="px-3 py-2 border rounded-md rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-[10px] bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Search
                    </button>
                </form>
            </div>
            <h1 className="text-3xl font-bold mb-6">Car List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                    cars && cars.length > 0 ? (
                        cars.map((car) => (
                            <Link to={`/car/${car.id}`} key={car.id}>
                                <Card car={car} />
                            </Link>
                        ))
                    ) : <>No cars added</>
                }

            </div>
        </div>
    )
}

export default CarListPage
