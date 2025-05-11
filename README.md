# WebTech Final Project – Dynamic Web Application

## 📌 Project Description

For our Web Systems and Technologies final project, we built a **dynamic web application** using **Next.js**, **Tailwind CSS**, and **ShadCN UI**. Our goal was to apply our skills in frontend development, API integration, and data visualization in a real-world scenario.

We used the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch and display users, posts, and comments. We implemented interactive user profiles with **Mapbox** to show address locations and added **ApexCharts** to visualize app data dynamically.

This project helped us understand the full process of planning, developing, styling, integrating APIs, and deploying a responsive and modern web application.

---

## ⚙️ Setup and Installation Instructions

Here’s how we built and ran the project from scratch:

### 🧩 Requirements

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

---

### 🚀 Step-by-Step Setup (As We Did It)

#### 1. **Create a New Next.js Project**

We started with a fresh Next.js app using the App Router:

```bash
npx create-next-app@latest webtech-final-project
cd webtech-final-project

We followed the official Tailwind setup:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

We used ShadCN UI for component styling:
npx shadcn-ui@latest init

Then we added components like this:
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add pagination
npx shadcn-ui@latest add chart
npx shadcn-ui@latest add sidebar
and many more.

We used React Query for powerful and optimized data fetching:
npm install @tanstack/react-query

Install ApexCharts for Visualization
npm install apexcharts react-apexcharts

We used the official Google Maps JavaScript API loader:
npm install @react-google-maps/api

Run the Project Locally
npm run dev

Built for Production
npm run build
npm start


👨‍💻 Our Team Contributions
Team Member	        What They Worked On
Bhea Marie Gheul	Give a suggestion to the overall design of the website.
Revin Gestiada		Give a suggestion to the overall design of the website.
Celena Jean Scott	Give a suggestion to the overall design of the website.
Leonard James Gobris	Made the nextjs app template and connects it to GitHub repository. Copy the dashboard type template and edited it. Made 			both backend and frontend developing. Uploading to vercel.

🌐 Live Demo
🔗 Deployed on Vercel: https://viewpoint-sage.vercel.app/
