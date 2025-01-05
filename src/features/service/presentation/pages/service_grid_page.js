import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../widgets/service_card";
import { RouteNames } from "../../../../core/routes";
import { db } from "../../../../core/firebase_config";
import { collection, onSnapshot } from "firebase/firestore";

const ServiceGridPage = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const servicesRef = collection(db, "services");

        const unsubscribe = onSnapshot(servicesRef, (snapshot) => {
            const serviceData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(serviceData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddService = () => {
        navigate(RouteNames.SERVICE_FORM);
    };

    return (
        <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8">
            <span className="text-2xl mb-10 font-semibold">Services</span>
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

            {/* Floating "Add Service" button */}
            <button
                onClick={handleAddService}
                className="fixed bottom-10 right-10 mt-5 flex items-center px-4 py-3 rounded bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition duration-300"
            >
                Add Service
            </button>
        </div>
    );
};

export default ServiceGridPage;
