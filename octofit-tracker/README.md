# OctoFit Tracker

## Overview
The OctoFit Tracker is a modern multi-tier application designed to help users track their fitness activities. It consists of a frontend built with React and Vite, and a backend powered by Node.js, Express, and TypeScript, with MongoDB for data storage.

## Project Structure
```
octofit-tracker
├── frontend          # Frontend application
│   ├── src          # Source files for React application
│   ├── public       # Static assets
│   ├── index.html   # Main HTML file
│   ├── package.json  # Frontend dependencies and scripts
│   ├── tsconfig.json # TypeScript configuration for frontend
│   └── vite.config.ts # Vite configuration
├── backend           # Backend application
│   ├── src          # Source files for Express application
│   ├── package.json  # Backend dependencies and scripts
│   ├── tsconfig.json # TypeScript configuration for backend
│   └── README.md    # Documentation for backend
└── README.md        # Documentation for overall project
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- MongoDB (version 4.0 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd octofit-tracker
   ```

2. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

3. Set up the backend:
   ```
   cd ../backend
   npm install
   ```

### Running the Application

- Start the MongoDB server on port 27017.
- Start the backend server:
   ```
   cd backend
   npm start
   ```
   The backend will run on port 8000.

- Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   The frontend will run on port 5173.

### API Documentation
Refer to the `backend/README.md` for detailed API usage and endpoints.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.