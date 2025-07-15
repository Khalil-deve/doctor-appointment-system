import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import { Search, LoaderCircle, Filter } from "lucide-react";
import BackMenu from "../components/BackMenu";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/doctors");
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

  useEffect(() => {
    let result = doctors;

    if (specialization !== "All") {
      result = result.filter(
        (doc) => doc.specialization === specialization
      );
    }

    if (search) {
      result = result.filter((doc) =>
        doc.user?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, specialization, doctors]);

  const specializations = [
    "All",
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
    "Gynecologist",
    "Psychiatrist",
    "General Physician"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <BackMenu path={'/'} name={'Home'}/>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Specialist</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with our experienced healthcare professionals for personalized care
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-10">
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 mb-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg"
        >
          <Filter className="w-5 h-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filter Controls */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-white p-4">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            {/* Specialization Dropdown */}
            <div className="relative w-full md:w-1/3">
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none appearance-none"
              >
                {specializations.map((spec, i) => (
                  <option key={i} value={spec}>
                    {spec === "All" ? "All Specializations" : spec}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(search || specialization !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSpecialization("All");
                }}
                className="w-full md:w-auto px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {filtered.length} {filtered.length === 1 ? 'Doctor' : 'Doctors'} Found
        </h2>
        <div className="text-sm text-gray-500">
          Showing {filtered.length} of {doctors.length} doctors
        </div>
      </div>

      {/* Doctors List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <LoaderCircle className="animate-spin text-blue-600 w-10 h-10 mb-4" />
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any doctors matching your criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSpecialization("All");
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}