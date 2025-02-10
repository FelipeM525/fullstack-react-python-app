import axios from "axios";
import { useEffect, useState } from "react";
import AccomodationDetail from "../component/accommodation-detail";

const Home = () => {
     const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [filter, setFilter] = useState({
        city: "",
        state: "",
        minPrice: "",
        maxPrice: "",
        type: "",
        acc_listing: "",
        offset: 0,
        limit: 9,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setNotFound(false)
                const response = await axios.get(`${apiUrl}/acomodacoes/?offset=0&limit=9`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                setData(response.data.accommodations)
                console.log(data)

            } catch (error) {
                    setNotFound(true)
            }
        }
        fetchData()
    }, [])


    async function handleSubmit(event) {

        try {
            event.preventDefault()
            console.log('botao ativou')
            setNotFound(false)
            const response = await axios.get(`${apiUrl}/acomodacoes/?offset=0&limit=9${filter.limit ? `&limit=${filter.limit}` : ''}${filter.minPrice ? `&min_price=${filter.minPrice}` : ''}${filter.maxPrice ? `&max_price=${filter.maxPrice}` : ''}${filter.city ? `&city=${filter.city}` : ''}${filter.state ? `&state=${filter.state}` : ''}${filter.type && filter.type !== 'Todos' ? `&type=${filter.type}` : ''}${filter.acc_listing ? `&acc_listing=${filter.acc_listing}` : ''}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setData(response.data.accommodations)
            console.log(data)

        } catch (error) {
            setNotFound(true)
        }
    }


    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (property) => {
        let updatedFavorites;
        if (favorites.some((fav) => fav.id === property.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== property.id);
        } else {
            updatedFavorites = [...favorites, property];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };



    return (
        <div className="bg-slate-100" >
            <div className="flex justify-center mt-14 bg-slate-100 p-6 shadow-md rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4">
                    <input
                        id="state"
                        value={filter.state}
                        onChange={({ target }) => setFilter({ ...filter, state: target.value })}
                        placeholder="Estado"
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    />

                    <input
                        id="city"
                        value={filter.city}
                        onChange={({ target }) => setFilter({ ...filter, city: target.value })}
                        placeholder="Cidade"
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    />

                    <input
                        id="minPrice"
                        value={filter.minPrice}
                        onChange={({ target }) => setFilter({ ...filter, minPrice: target.value })}
                        placeholder="Preço Mínimo"
                        type="number"
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    />

                    <input
                        id="maxPrice"
                        value={filter.maxPrice}
                        onChange={({ target }) => setFilter({ ...filter, maxPrice: target.value })}
                        placeholder="Preço Máximo"
                        type="number"
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    />

                    <select
                        id="type"
                        value={filter.type}
                        onChange={({ target }) => setFilter({ ...filter, type: target.value })}
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    >
                        <option disabled value="">Tipo de imóvel</option>
                        <option>Todos</option>
                        <option>Casa</option>
                        <option>Apartamento</option>
                    </select>

                    <select
                        name="acc_listing"
                        value={filter.acc_listing}
                        onChange={({ target }) => setFilter({ ...filter, acc_listing: target.value })}
                        className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-slate-400"
                    >
                        <option disabled value="">Modalidade</option>
                        <option>Aluguel</option>
                        <option>Venda</option>
                    </select>

                    <button className="bg-slate-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-slate-800 transition">
                        Procurar
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-14 py-6">
                {notFound == false ? (
                    data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:cursor-pointer"
                            onClick={() => setSelectedAccommodation(item)}
                        >
                            <button
                                className={`absolute top-2 right-2 p-2 rounded-sm hover:cursor-pointer ${favorites.some((fav) => fav.id === item.id)
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleFavorite(item);
                                      }}
                            >
                                ♥︎
                            </button>

                            <img
                                className="w-full h-64 object-cover rounded-t-lg"
                                src={`${apiUrl}${item.photos[0].url}`}
                                alt={item.title}
                            />
                            <div className="p-4 flex flex-col items-center text-center">
                                <strong className="text-lg text-gray-800">{`R$ ${Intl.NumberFormat().format(item.price)}`}</strong>
                                <span className="text-gray-700 font-semibold">{item.title}</span>
                                <span className="text-gray-500">{item.city}, {item.state}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 flex justify-center items-center bg-slate-100 text-gray-600 text-lg font-semibold p-6 rounded-md shadow-md">
                        Nada Encontrado
                    </div>
                )
                }
                {selectedAccommodation && <AccomodationDetail accommodation={selectedAccommodation} onClose={() => setSelectedAccommodation(null)} />}
            </div>



        </div>
    )
}
export default Home;

