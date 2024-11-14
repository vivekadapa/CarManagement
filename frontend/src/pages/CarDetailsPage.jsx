import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'



const CarDetailsPage = () => {
    const { carId } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/${carId}`, {
                    headers: {
                        Authorization: `Bearer ${token || localStorage.getItem('token')}`
                    }
                })
                setCar(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch car details')
                setLoading(false)
            }
        }

        fetchCarDetails()
    }, [carId])

    const handleDelete = async () => {
        // if (confirmDelete) {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cars/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token || localStorage.getItem('token')}`
                }
            })
            alert('Car deleted successfully')
            navigate('/')
        } catch (err) {
            alert('Failed to delete the car')
        }
        // }
    }

    const handleEdit = () => {
        navigate(`/editCar/${carId}`)  // Navigate to the edit page (create this page later)
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {car && (
                <>
                    <h1 className="text-3xl font-bold mb-6">{car.title}</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2">
                            <img
                                src={car.images[0] || "/carplaceholder.png"}
                                alt={car.title}
                                className="w-full h-80 object-cover rounded-lg"
                            />
                        </div>
                        <div className="md:w-1/2 md:ml-8">
                            <p className="text-lg text-gray-600 mb-4">{car.description}</p>
                            <div className="flex flex-wrap mb-4">
                                <span className="font-bold text-gray-800 mr-4">Company: </span>
                                <span>{car.company}</span>
                            </div>
                            <div className="flex flex-wrap mb-4">
                                <span className="font-bold text-gray-800 mr-4">Car Type: </span>
                                <span>{car.car_type}</span>
                            </div>
                            <div className="flex flex-wrap mb-4">
                                <span className="font-bold text-gray-800 mr-4">Dealer: </span>
                                <span>{car.dealer}</span>
                            </div>
                            <div className="flex flex-wrap mb-4">
                                <span className="font-bold text-gray-800 mr-4">Added by User: </span>
                                <span>{car.userId}</span>
                            </div>
                            <div className="flex mt-6 space-x-4">
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CarDetailsPage
