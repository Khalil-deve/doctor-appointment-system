# 🏥 Doctor Appointment System

This is a full-stack Doctor Appointment System built with modern web technologies. It provides a seamless interface for **patients**, **doctors**, and an **admin** to manage healthcare appointments and user roles effectively.

---

## 🚀 Features

### 👨‍⚕️ Doctor Panel

- Doctors can register with a **2-step form**:
  1. **Basic Registration** (email, password, etc.)
  2. **Doctor Profile Form** (experience, specialization, availability, etc.)
- After registration, doctors can access a dedicated **dashboard** to manage appointments and view patient information.

### 🧑‍💻 Patient Panel

- Patients can register and log in.
- They can **book appointments** with available doctors.
- Patient data is stored in a **Patient model** for future reference.
- After booking, patients can view their appointments and profile on their **personal dashboard**.

### 🛠️ Admin Panel

- Admin has access to a separate dashboard to **manage users**, **approve or reject doctors**, and oversee all platform activity.

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Upload**: Cloudinary
- **Authentication**: JWT (JSON Web Token)
- **Form Validation**: Custom + Regex

---

## 🧠 How It Works

- ✅ **User Registration**: Patient and Doctor sign-up separately.
- ✅ **Cloudinary Integration**: Profile images are uploaded and stored permanently using Cloudinary.
- ✅ **Form Handling**: Doctors complete an additional info form post-registration.
- ✅ **Role-Based Dashboards**: Each role sees different UI and functionality.

---

## 📥 Getting Started

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/doctor-appointment-system.git

# Navigate into the project
cd doctor-appointment-system

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Run the development servers
npm run dev       # for frontend
# and in a separate terminal:
cd ../server
npm run dev       # for backend
```


Make sure to set up `.env` files in both `client` and `server` directories.



## 🔮 Future Improvements

- Notifications or email confirmation

---

## 📧 Contact

If you'd like to connect or suggest improvements, feel free to reach out:

**Muhammad Khalil**
[LinkedIn](https://linkedin.com/in/khalil-dev) | [GitHub](https://github.com/khalil-deve)

```

