import React, { useState } from 'react'
import { X } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CarCreationPage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [company, setCompany] = useState('')
    const [dealer, setDealer] = useState('')
    const [carType, setCarType] = useState('')
    const navigate = useNavigate();
    const token = localStorage.getItem('token')


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || [])
        const validFiles = files.filter(file =>
            ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
        ).slice(0, 10)
        setImages(prevImages => [...prevImages, ...validFiles].slice(0, 10))
    }

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('company', company)
        formData.append('dealer', dealer)
        formData.append('car_type', carType)
        images.forEach((image, index) => {
            formData.append('images', image)
        })
        
        try {
            const response = await axios.request({
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cars`,
                method: 'POST',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status !== 201) {
                throw new Error('Failed to create car listing')
            }
            setTitle('')
            setDescription('')
            setImages([])
            setCompany('')
            setDealer('')
            setCarType('')
            navigate('/');
        } catch (error) {
            console.error(error)
            alert('Error: ' + error.message)
        }
    }
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Car Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">Title</label>
                    <input
                        id="title"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        {images.map((image, index) => (
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
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dealer" className="block font-medium mb-1">Dealer</label>
                    <input
                        id="dealer"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={dealer}
                        onChange={(e) => setDealer(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="carType" className="block font-medium mb-1">Car Type</label>
                    <select
                        id="carType"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
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
                    Create Car Listing
                </button>
            </form>
        </div>
    )
}

export default CarCreationPage
