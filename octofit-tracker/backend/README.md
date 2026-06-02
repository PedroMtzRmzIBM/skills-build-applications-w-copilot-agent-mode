# OctoFit Tracker Backend

## Overview
The OctoFit Tracker backend is built using Node.js, Express, and TypeScript. It serves as the API layer for the OctoFit Tracker application, providing endpoints for data access and manipulation.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (version 4.0 or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/octofit-tracker.git
   cd octofit-tracker/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
1. Start the MongoDB server (ensure it's running on port 27017).
2. Run the backend server:
   ```
   npm run start
   ```
   The server will run on port 8000.

### API Endpoints
- **GET /api/example**: Example endpoint to demonstrate API functionality.

## Directory Structure
```
backend
├── src
│   ├── app.ts          # Entry point for the backend application
│   ├── routes          # Contains route definitions
│   │   └── index.ts    # Main routes file
│   └── models          # Contains Mongoose models
│       └── index.ts    # Main models file
├── package.json        # NPM configuration file
└── tsconfig.json       # TypeScript configuration file
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.