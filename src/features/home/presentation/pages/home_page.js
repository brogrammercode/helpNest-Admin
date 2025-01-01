import React from "react";

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-500 text-white p-6">
                <h1 className="text-3xl font-bold">Welcome to HelpNest</h1>
                <p className="mt-2 text-lg">Connecting consumers and service providers.</p>
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
