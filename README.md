# Online Fashion Store

This project is a full-stack e-commerce platform designed to offer a seamless shopping experience. With separate modules for customers, admin, and backend services, the application delivers robust functionality for browsing products, managing orders, and handling payments—all in one place.

## 🌐 Live Demo

Experience the platform live at 👉 [ForeverFashion](https://foreverfrontendfashion.vercel.app)

## ✨ Features

- **User-Friendly Interface:** Browse products, read detailed descriptions, and view high-quality images.
- **Shopping Cart & Checkout:** Add items to your cart and complete purchases effortlessly.
- **Multiple Payment Options:** Choose between secure Stripe payments or Cash on Delivery.
- **User Authentication:** Secure signup and login for personalized shopping experiences.
- **Order Management:** Track orders and view purchase history.
- **Admin Dashboard:** Manage products, orders, and users through a dedicated admin panel.
- **Responsive Design:** Fully optimized for mobile and desktop use.

## 🛠️ Tech Stack

- **Frontend:**
  - Built with **React** for creating dynamic and responsive user interfaces.
  - Styled using **Tailwind CSS** for fast, utility-first UI development.
  - Utilizes **React Context API (`useContext`)** for managing global state efficiently.


- **Backend:**
  - **Node.js:** JavaScript runtime for building scalable server-side applications.
  - **Express.js:** Web framework for handling routes and building RESTful APIs.
  - **MongoDB:** NoSQL database for storing product, user, and order data.
  - **Cloudinary:** For uploading and storing product images securely in the cloud.
  - **Stripe:** For processing secure online payments.
  - **JWT (JSON Web Tokens):** For user authentication and protected routes.

- **Deployment:**
  - **Frontend & Backend** hosted on **Vercel** for seamless and scalable deployment.
  - **MongoDB Atlas** used as the cloud-based database for reliable and secure data storage.


## 📦 Getting Started

### ✅ Prerequisites

- Node.js & npm
- MongoDB Atlas account or local MongoDB instance

### 📥 Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Ashrithiiitdm/Ecom.git
   cd Ecom
   ```

2. **Backend Setup:**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend/` directory and configure your environment variables (e.g., database connection string, secret keys).
   ```env
   PORT=8080
   MONGO_URL=''
   CLOUD_URL=''
   CLOUD_SECRET=''
   CLOUD_NAME=''
   JWT_SECRET=''
   ADMIN_MAIL=''
   ADMIN_PASS=''
   STRIPE_SECRET_KEY=''
   ```

   Start the backend server:

   ```bash
   npm start
   ```

3. **Frontend Setup:**

   Open a new terminal:

   ```bash
   cd frontend
   npm install
   ```

    Create a `.env` file in the `frontend/` directory and add:

   ```env
    VITE_BACKEND_URL='http://localhost:8080'
   ```

    Start the frontend server:
  
    ```bash
    npm run dev
    ```
4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173` to access the chat application.


5. **Admin Panel Setup:**

   If you plan to run the admin dashboard locally, navigate to the `admin/` directory, install dependencies, and start the server:

   ```bash
    cd admin
    npm install
   ```

    Create a `.env` file in the `admin/` directory and add:
    
    ```env
    VITE_BACKEND_URL='http://localhost:8080'
    ```
    Start the admin server:
    ```bash
    npm run dev
    ```
6. **Access the Admin Panel**
   Open your browser and navigate to `http://localhost:5174` to access the admin panel.

## 🚀 Usage

- **For Shoppers:** Browse the product catalog, add items to your cart, and complete your purchase using our secure checkout.
- **For Admins:** Log in to the admin panel to manage products, orders, and users effectively.

## 🙋‍♂️ Contact

Built by [Ashrith](https://github.com/Ashrithiiitdm) & [Rajvardhan](https://github.com/RajV95) with ❤️

---

If you find this project helpful, feel free to ⭐ the repository and contribute!
