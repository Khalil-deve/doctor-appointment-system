import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookAppointment () {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, { doctorId, date, time });
      toast.success('Appointment booked successfully!');
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Book Appointment</h2>
      <form onSubmit={handleBook}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Book Appointment</button>
      </form>
    </div>
  );
};

