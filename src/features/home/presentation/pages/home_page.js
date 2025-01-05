import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { RouteNames } from "../../../../core/routes";
import { ArchiveBook, Unlock, UserSquare } from "iconsax-react";

// ServiceCard Component: This will be used to render each individual service box
const ServiceCard = ({ name, image, description }) => (
    <div className="w-full max-w-xs bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full" style={{ height: "150px" }}>
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-t-lg"
            />
        </div>
        <div className="p-4 bg-white">
            <span className="text-xl font-semibold">{name}</span>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    </div>
);

// GridBuilder Component: Accepts a list of services and renders them dynamically
const GridBuilder = ({ services }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
            <ServiceCard
                key={index}
                name={service.name}
                image={service.image}
                description={service.description}
            />
        ))}
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    // State to track the selected button (Users or Services)
    const [selectedOption, setSelectedOption] = useState("users");

    // Sample data for services
    const services = [
        {
            name: "Plumber",
            image: "https://cdn.dribbble.com/userupload/17406129/file/original-b4f6e6400c247bbf6029c78995885d75.png?format=webp&resize=400x300&vertical=center",
            description: "Experienced plumber for all your needs. Reliable and efficient in fixing plumbing issues. Available 24/7 for emergency services.",
        },
        {
            name: "Electrician",
            image: "https://cdn.dribbble.com/userupload/17406129/file/original-b4f6e6400c247bbf6029c78995885d75.png?format=webp&resize=400x300&vertical=center",
            description: "Certified electrician for wiring, repairs, and installations. Ensuring safety and quality with each job. Available 24/7.",
        },
        // Add more service data as required
    ];

    // Sign-out function
    const handleSignOut = () => {
        signOut(auth) // Firebase sign-out method
            .then(() => {
                console.log("User signed out successfully");
                navigate(RouteNames.AUTH_PAGE); 
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    // Handle selection of option (Users or Services)
    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="min-h-screen flex">
            {/* Drawer */}
            <div className="flex flex-col px-10 py-10 justify-between w-1/6 bg-gray-100">
                <div className="flex-col">
                    <span className="font-semibold text-lg">helpNest</span>
                    <button
                        onClick={() => handleSelect('users')}
                        className={`mt-5 flex items-center px-3 py-2 rounded ${selectedOption === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                        <UserSquare className="mr-3 size-5" />
                        Users
                    </button>
                    <button
                        onClick={() => handleSelect('services')}
                        className={`mt-5 flex items-center px-3 py-2 rounded ${selectedOption === 'services' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                        <ArchiveBook className="mr-3 size-5" />
                        Services
                    </button>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center hover:bg-gray-200 px-3 py-2 rounded"
                >
                    <Unlock className="mr-3 size-5" />
                    Log out
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-col px-10 py-10 w-5/6">
                <span className="text-2xl mb-10 font-semibold">
                    {selectedOption === 'users' ? 'Users' : 'Services'}
                </span>

                {/* Display Grid of Service Boxes if 'Services' is selected */}
                {selectedOption === 'services' && <GridBuilder services={services} />}
            </div>
        </div>
    );
};

export default HomePage;
