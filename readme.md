# Full Stack Application

This project is a full-stack web application that includes a React frontend and a Flask backend. The application provides user authentication and protected routes.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **React Router**: A library for routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend

- **Flask**: A micro web framework written in Python.
- **Flask-CORS**: A Flask extension for handling Cross-Origin Resource Sharing (CORS).
- **Flask-JWT-Extended**: A Flask extension for working with JSON Web Tokens (JWT).
- **SQLAlchemy**: An SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- **SQLite**: A C-language library that provides a lightweight, disk-based database.

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///instance/database.db

### Frontend

No environment variables are required for the frontend.

## How to Run the Backend

1. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

2. **Create a virtual environment:**

   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. **Install the dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

5. **Run the Flask application:**
   ```sh
   flask run
   ```

The backend will be running on [`http://localhost:5000`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmahinashraful%2FDocuments%2FFlaskAuthBoilerplate%2Ffrontend%2Fvite.config.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A10%2C%22character%22%3A17%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmahinashraful%2FDocuments%2FFlaskAuthBoilerplate%2Ffrontend%2Fsrc%2FApp.jsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A15%2C%22character%22%3A13%7D%7D%5D%2C%2268f98157-ec22-4e07-a657-58639a8fa649%22%5D "Go to definition").

## How to Run the Frontend

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install the dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`.

## API Endpoints

### Authentication

- **POST /api/register:** Register a new user.
- **POST /api/login**: Login a user and return a JWT token.

### Protected Routes

- **GET /api/protected**: Access a protected route. Requires a valid JWT token.
- **GET /api/users**: Get a list of users. Requires a valid JWT token.

## Frontend Routes

- **/login**: Login page.
- **/register**: Registration page.
- **/dashboard**: Dashboard page (protected route).

## Additional Information

- The frontend uses [`localStorage`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmahinashraful%2FDocuments%2FFlaskAuthBoilerplate%2Ffrontend%2Fsrc%2FApp.jsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A18%7D%7D%5D%2C%2268f98157-ec22-4e07-a657-58639a8fa649%22%5D "Go to definition") to store the JWT token.
- The backend uses Flask-JWT-Extended to handle JWT authentication.
- The Vite development server is configured to proxy API requests to the Flask backend.

## License

This project is licensed under the MIT License.
