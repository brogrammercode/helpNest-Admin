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

export default ServiceCard;