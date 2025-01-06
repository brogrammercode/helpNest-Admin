import React, { useState } from "react";
import { ServiceModel } from "../../data/service_model";
import ServiceRemoteDs from "../../data/service_remote_ds"; // Import the Firebase service class

const ServiceForm = ({ initialService }) => {
    const [service, setService] = useState(initialService || new ServiceModel({}));
    const [logoPreview, setLogoPreview] = useState(null);
    const [slidesPreview, setSlidesPreview] = useState([null, null]);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const serviceRemoteDs = new ServiceRemoteDs(); // Initialize the Firebase service class

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setService({ ...service, [name]: checked });
        } else {
            setService({ ...service, [name]: value });
        }
    };

    const handleLogoFileChange = (e) => {
        const file = e.target.files[0];
        setLogoPreview(URL.createObjectURL(file)); // Preview the selected logo
    };

    const handleSlideFileChange = (e, index) => {
        const file = e.target.files[0];
        const updatedSlidesPreview = [...slidesPreview];
        updatedSlidesPreview[index] = URL.createObjectURL(file); // Preview the selected slide
        setSlidesPreview(updatedSlidesPreview);

        if (index === 0) setFile1(file);
        if (index === 1) setFile2(file);
    };

    const handleRemoveLogo = () => {
        setLogoPreview(null); // Deselect the logo
    };

    const handleRemoveSlide = (index) => {
        const updatedSlidesPreview = [...slidesPreview];
        updatedSlidesPreview[index] = null; // Deselect the slide
        setSlidesPreview(updatedSlidesPreview);

        if (index === 0) setFile1(null);
        if (index === 1) setFile2(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceInstance = new ServiceModel(service);

        try {
            await serviceRemoteDs.setService(serviceInstance, logoPreview, file1, file2);
            console.log("Service submitted successfully!");
        } catch (error) {
            console.error("Error submitting service:", error);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-white flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-xl">
                <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    {service.id ? "Edit Service" : "Create Service"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Service Name */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={service.name}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Logo</label>
                        <input
                            type="file"
                            onChange={handleLogoFileChange}
                            accept="image/*"
                            className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        {logoPreview && (
                            <div className="mt-4 flex items-center justify-between">
                                <img
                                    src={logoPreview}
                                    alt="Logo Preview"
                                    width="150"
                                    className="rounded-lg shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="ml-4 text-red-600 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={service.description}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    {/* Avg Charge */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Avg Charge</label>
                        <input
                            type="number"
                            name="avgCharge"
                            value={service.avgCharge}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    {/* Avg Time */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Avg Time</label>
                        <input
                            type="text"
                            name="avgTime"
                            value={service.avgTime}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    {/* Deactivate Checkbox */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            name="deactivate"
                            checked={service.deactivate}
                            onChange={handleInputChange}
                            className="mr-3 h-6 w-6"
                        />
                        <label className="text-lg font-medium text-gray-700">Deactivate</label>
                    </div>

                    {/* Slides Upload */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Slides (optional)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {slidesPreview.map((slide, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <input
                                        type="file"
                                        onChange={(e) => handleSlideFileChange(e, index)}
                                        accept="image/*"
                                        className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                    {slide && (
                                        <div className="mt-4 flex items-center justify-between">
                                            <img
                                                src={slide}
                                                alt={`Slide ${index + 1} Preview`}
                                                width="150"
                                                className="rounded-lg shadow-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSlide(index)}
                                                className="ml-4 text-red-600 font-semibold"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ServiceForm;
