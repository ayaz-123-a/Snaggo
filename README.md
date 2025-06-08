Snaggo — Full-Stack Ecommerce Website

Overview
Snaggo is a modern, responsive ecommerce web application built with React, Tailwind CSS, Firebase, and Redux Toolkit. It features user authentication, protected routes, product browsing, shopping cart management, order history, and a clean, user-friendly interface.

This project showcases best practices in React development, state management, UI design, and backend integration with Firebase.

Features
User Authentication: Signup, Login, and Logout powered by Firebase Authentication.

Protected Routes: Secure user and admin pages accessible only after login.

State Management: Global state management using Redux Toolkit and React Context API.

Responsive UI: Mobile-first design using Tailwind CSS for seamless experience across devices.

Product Management: Browse, add, and view products with dynamic routing.

Shopping Cart: Add, remove, and update products with live cart count and totals.

Order History: Users can view their past orders with details.

Search Functionality: Dynamic search bar filtering products in real-time.

Admin Panel: Admin role with access to add new products and manage listings.

Tech Stack
Frontend	Backend	State Management	Styling	Authentication
React	Firebase (Firestore & Auth)	Redux Toolkit + Context API	Tailwind CSS	Firebase Auth

Screenshots
Add screenshots or demo gifs here to showcase UI and features.

Getting Started
Prerequisites
Node.js (v14+ recommended)

npm or yarn

Firebase account with project set up

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/ayaz-123-a/Snaggo.git
cd snaggo
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Setup Firebase

Create a Firebase project.

Enable Firestore and Authentication.

Copy your Firebase config and replace it in your config file.

Run the app locally:

bash
Copy
Edit
npm start
# or
yarn start
Open http://localhost:3000 to view it in the browser.

Deployment
You can deploy this app easily using Firebase Hosting or platforms like Vercel or Netlify.

For Firebase Hosting:

bash
Copy
Edit
firebase login
firebase init hosting
firebase deploy
What I Learned
Implementing protected routes with React Router.

Managing global state using Redux Toolkit alongside React Context.

Connecting React frontend with Firebase backend services.

Building a responsive, mobile-first UI with Tailwind CSS.

Handling asynchronous operations and real-time updates in Firestore.

Implementing user order history with Firestore data.

Structuring scalable React projects and maintaining code readability.

Future Improvements
Add payment gateway integration (e.g., Stripe, PayPal).

Improve UI/UX with animations and accessibility improvements.

Add server-side rendering (SSR) or static site generation (SSG) for SEO.

License
This project is licensed under the MIT License.

Contact
Mahammad Ayaz K
GitHub | LinkedIn | mahammadayaz124@gmail.com
