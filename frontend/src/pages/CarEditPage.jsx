import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { X } from 'lucide-react'

const CarEditPage = () => {
    const { carId } = useParams()
    const navigate = useNavigate()
    console.log(carId)
    const [car, setCar] = useState({
        title: '',
        description: '',
        images: [],
        company: '',
        dealer: '',
        carType: ''
    })
    const [loading, setLoading] = useState(true)
    const [newImages, setNewImages] = useState([])
    
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/${carId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setCar(response.data)
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch car details', err)
                setLoading(false)
            }
        }

        fetchCarDetails()
    }, [carId])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || [])
        const validFiles = files.filter(file =>
            ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
        ).slice(0, 10)
        setNewImages(prevImages => [...prevImages, ...validFiles].slice(0, 10))
    }

    const removeImage = (index) => {
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', car.title)
        formData.append('description', car.description)
        formData.append('company', car.company)
        formData.append('dealer', car.dealer)
        formData.append('car_type', car.carType)
        newImages.forEach(image => {
            formData.append('images', image)
        })

        try {
            const response = await axios.request({
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cars/${carId}`,
                method: 'PUT',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error('Failed to update car listing')
            }

            navigate(`/cars/${carId}`)
        } catch (error) {
            console.error(error)
            alert('Error: ' + error.message)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Car Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">Title</label>
                    <input
                        id="title"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={car.title}
                        onChange={(e) => setCar({ ...car, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={car.description}
                        onChange={(e) => setCar({ ...car, description: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="images" className="block font-medium mb-1">Images (up to 10)</label>
                    <input
                        id="images"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageUpload}
                        multiple
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {car.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image || '/carplaceholder.png'}
                                    alt={`Uploaded ${index + 1}`}
                                    className="h-20 w-20 object-cover rounded"
                                />
                            </div>
                        ))}
                        {newImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="h-20 w-20 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    aria-label={`Remove image ${index + 1}`}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="company" className="block font-medium mb-1">Company</label>
                    <input
                        id="company"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={car.company}
                        onChange={(e) => setCar({ ...car, company: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dealer" className="block font-medium mb-1">Dealer</label>
                    <input
                        id="dealer"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={car.dealer}
                        onChange={(e) => setCar({ ...car, dealer: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="carType" className="block font-medium mb-1">Car Type</label>
                    <select
                        id="carType"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={car.carType}
                        onChange={(e) => setCar({ ...car, carType: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select car type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="truck">Truck</option>
                        <option value="coupe">Coupe</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Car Listing
                </button>
            </form>
        </div>
    )
}

export default CarEditPage
