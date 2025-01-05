import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { RouteNames } from "../../../../core/routes";
import { ArchiveBook, Unlock, UserSquare, Menu } from "iconsax-react";
import ServiceGridPage from "../../../service/presentation/pages/service_grid_page";

const HomePage = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [selectedOption, setSelectedOption] = useState("users");

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



    // Sign-out function
    const handleSignOut = () => {
        signOut(auth) 
            .then(() => {
                console.log("User signed out successfully");
                navigate(RouteNames.AUTH_PAGE);
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="min-h-screen flex">
            <div
                className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 md:hidden ${isDrawerOpen ? "block" : "hidden"
                    }`}
                onClick={toggleDrawer}
            />
            <div
                className={`fixed inset-0 z-50 bg-gray-100 transition-transform transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 md:w-1/6 md:flex md:flex-col md:px-10 md:py-10 justify-between`}
            >
                <div className="flex-col mb-8">
                    <span className="font-semibold text-lg">helpNest</span>
                    <button
                        onClick={() => handleSelect("users")}
                        className={`mt-5 flex items-center px-3 py-2 rounded ${selectedOption === "users"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                            }`}
                    >
                        <UserSquare className="mr-3 size-5" />
                        Users
                    </button>
                    <button
                        onClick={() => handleSelect("services")}
                        className={`mt-5 flex items-center px-3 py-2 rounded ${selectedOption === "services"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                            }`}
                    >
                        <ArchiveBook className="mr-3 size-5" />
                        Services
                    </button>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center hover:bg-gray-200 px-3 py-2 rounded mt-auto"
                >
                    <Unlock className="mr-3 size-5" />
                    Log out
                </button>
            </div>

            <button
                onClick={toggleDrawer}
                className="md:hidden fixed top-5 left-5 p-3 bg-blue-500 text-white rounded-full"
            >
                <Menu />
            </button>
            <div className="flex flex-col px-6 py-6 w-full md:w-5/6">
                {selectedOption === "users" && (
                    <h1 className="text-4xl font-semibold">Users</h1>
                )}
                {selectedOption === "services" && <ServiceGridPage />}
            </div>
        </div>
    );
};

export default HomePage;
