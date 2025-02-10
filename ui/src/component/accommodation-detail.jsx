const AccomodationDetail = ({ accommodation, onClose }) => {
    if (!accommodation) return null;
    const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    console.log(apiUrl)
    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
              

                <img
                    className="w-full h-64 object-cover rounded-md"
                    src={`${apiUrl}${accommodation.photos[0].url}`}
                    alt={accommodation.title}
                />

                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">{accommodation.title}</h2>
                    <p className="text-gray-600 text-lg font-semibold mt-1">{`R$ ${accommodation.price}`}</p>
                    <p className="text-gray-500">{accommodation.type} • {accommodation.acc_listing}</p>

                    <p className="text-gray-700 mt-3">
                        📍 {accommodation.street}, {accommodation.city} - {accommodation.state}, {accommodation.zip_code}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccomodationDetail;
