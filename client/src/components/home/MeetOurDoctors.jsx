import DoctorCard from "../DoctorCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MeetOurDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/doctors`
        );
        setDoctors(response.data.data);
        setFiltered(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50" id="meet-doctors">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
          Meet Our Doctors
        </h2>
        <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Get to know our team of highly qualified and compassionate healthcare
          professionals.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-4 text-center py-10">
            <p className="text-gray-500">Loading doctors...</p>
          </div>
        ) : Array.isArray(filtered) && filtered.length === 0 ? (
          <div className="col-span-4 text-center py-10">
            <p className="text-gray-500">No doctors found.</p>
          </div>
        ) : (
          filtered
            .slice(0, 4)
            .map((doc) => <DoctorCard key={doc._id} doctor={doc} />)
        )}
      </div>

      {/* Search (Optional) */}
      <div className="mt-14 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              const searchTerm = e.target.value.toLowerCase();
              const filteredDoctors = doctors.filter((doc) =>
                doc.user?.name?.toLowerCase().includes(searchTerm)
              );
              setFiltered(filteredDoctors);
            }}
            placeholder="Search by name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={(e) => setSearch("")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Search Doctor
          </button>
        </div>
      </div>
    </section>
  );
}
