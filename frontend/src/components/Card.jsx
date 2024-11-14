import React from 'react'


const Card = ({ car }) => {
    return (
        <div className="max-w-sm rounded h-80 overflow-hidden shadow-lg bg-white">
            <img
                src={car.images[0] || "/carplaceholder.png"}
                alt={car.title}
                className="w-full h-1/2 object-cover"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{car.title}</div>
                <p className="text-gray-600 text-sm mb-2">{car.company}</p>
                <p className="text-gray-700 text-base mb-2 line-clamp-2">{car.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{car.car_type}</span>
                    <span>{car.dealer}</span>
                </div>
            </div>
        </div>
    )
}

export default Card
