import { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';

export default function DoctorSearch () {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get('/api/doctors', { params: { specialization } });
      setDoctors(response.data);
    };
    fetchDoctors();
  }, [specialization]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Search Doctors</h2>
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

