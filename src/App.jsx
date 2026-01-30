import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,subregion,languages,currencies,area,latlng"
        );
        setCountries(res.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [countries, search]);

  const filteredCountries = countries.filter((country) =>
    country.name?.common
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading countries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">🌎 Discover the World 🗺️</h1>
        <p className="text-gray-600">
          Type a country and get all the essentials — capital, population, and more!
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl px-4 py-3 shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCountries.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No countries found 🌐
          </div>
        ) : (
          filteredCountries.map((country, index) => (
            <div
              key={country.name?.common}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col opacity-0 translate-y-6"
              style={{ minHeight: "400px" }} // extra spacing for hover
            >
              {/* Flag */}
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={country.flags?.svg}
                  alt={country.name?.common}
                  className="h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-xl font-semibold mb-1">
                  {country.name?.common}
                </h2>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-800">Capital:</span>{" "}
                    {country.capital?.[0] || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Population:</span>{" "}
                    {country.population?.toLocaleString() || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Region:</span>{" "}
                    {country.region || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Subregion:</span>{" "}
                    {country.subregion || "N/A"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-800">Languages:</span>{" "}
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-800">Currencies:</span>{" "}
                    {country.currencies
                      ? Object.values(country.currencies)
                          .map((c) => `${c.name} (${c.symbol})`)
                          .join(", ")
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Area:</span>{" "}
                    {country.area?.toLocaleString() || "N/A"} km²
                  </div>
                </div>

                {/* Google Maps link */}
                {country.latlng?.length === 2 && (
                  <p className="mt-3 text-sm text-blue-500 hover:underline hover:translate-x-1 transition-transform duration-200">
                    <a
                      href={`https://www.google.com/maps/@${country.latlng[0]},${country.latlng[1]},5z`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See on Google Maps
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
        
      {/* Tailwind animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s forwards;
          }
        `}
      </style>
      <Footer />
    </div>
  );
}

export default App;
