import { Link } from "react-router-dom";
import ResponsiveTable from "../Shared/ResponsiveTable";
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function UserManagement({ users = [], patients = [], doctors = [] }) {
  // Combine all user data with their roles and statuses
  const formattedUsers = users.map(user => {
    // Find associated doctor/patient profiles
    const doctorProfile = doctors.find(d => d.user?._id === user._id);
    
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1), 
      status: "Active", // Default status 
      profileImage: user.profileImage,
      // Add additional fields based on role
      ...(doctorProfile && {
        specialization: doctorProfile.specialization
      }),
      
    };
  });

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <Link to='/register' className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2">
            <Plus />
            Add User
          </Link>
        </div>
      </div>

      <ResponsiveTable
        headers={["User", "Email", "Role", "Status", "Actions"]}
        data={formattedUsers}
        renderRow={(user) => (
          <>
            <td className="p-3">
              <div className="flex items-center">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium">{user.name}</p>
                  {user.specialization && (
                    <p className="text-xs text-gray-500">{user.specialization}</p>
                  )}
                </div>
              </div>
            </td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === "Doctor" 
                  ? "bg-purple-100 text-purple-800"
                  : user.role === "Admin"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
              }`}>
                {user.role}
              </span>
            </td>
            <td className="p-3">
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.status === "Active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                {user.status}
              </span>
            </td>
            <td className="p-3">
              <button 
                className="text-blue-600 hover:text-blue-800 mr-3"
                title="Edit user"
              >
                <Pencil className="h-5 w-5"/>
              </button>
              <button 
                className="text-red-600 hover:text-red-800"
                title="Delete user"
              >
                <Trash2 className="h-5 w-5"/>
              </button>
            </td>
          </>
        )}
      />
    </div>
  );
}