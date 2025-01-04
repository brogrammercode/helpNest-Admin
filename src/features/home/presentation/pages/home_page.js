import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { getAuth, signOut } from "firebase/auth"; // Firebase Auth
import { RouteNames } from "../../../../core/routes";

const HomePage = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const auth = getAuth(); // Get Firebase Auth instance

    // Sign-out function
    const handleSignOut = () => {
        signOut(auth) // Firebase sign-out method
            .then(() => {
                // Sign-out successful
                console.log("User  signed out successfully");
                navigate(RouteNames.AUTH_PAGE); // Redirect to login page
            })
            .catch((error) => {
                // Handle errors
                console.error("Error signing out:", error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-500 text-white p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome to HelpNest</h1>
                        <p className="mt-2 text-lg">Connecting consumers and service providers.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="mb-4">
                        HelpNest is dedicated to simplifying the connection between service providers and consumers, making it easier to find and offer services.
                    </p>

                    <h3 className="text-xl font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal list-inside">
                        <li>Browse available services from trusted providers.</li>
                        <li>Request a service and receive quotes.</li>
                        <li>Schedule and complete your service with ease.</li>
                    </ol>

                    <div className="mt-6">
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>HelpNest &copy; 2025 | All rights reserved</p>
            </footer>
        </div>
    );
};

export default HomePage;