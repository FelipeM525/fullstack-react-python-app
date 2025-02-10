import { useState, useEffect } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Favoritos 💖</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src={`http://localhost:8000${item.photos[0].url}`}
                alt={item.title}
              />
              <div className="p-4 text-center">
                <strong className="text-lg text-gray-800">{`R$ ${item.price}`}</strong>
                <span className="text-gray-700 font-semibold block">{item.title}</span>
                <span className="text-gray-500">{item.city}, {item.state}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">Nenhuma propriedade favoritada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
