# GitScout

GitScout is a powerful and intuitive GitHub repository explorer that helps users search, filter, and analyze repositories efficiently.

## 🛠 Features

- 🔍 **Search Repositories** – Quickly find GitHub repositories based on keywords.
- 📊 **View Repository Details** – Access stars, forks, contributors, and more.
- 🏷 **Filter & Sort** – Sort repositories by stars, forks, or creation date.
- 📈 **Trending Repositories** – Discover popular repositories in different categories.
- 🎨 **User-Friendly UI** – Clean and modern interface for seamless navigation.

## Live Demo

Check out the live application: [mern-github-app-8pzc.onrender.com](https://mern-github-app-8pzc.onrender.com/)

## Screenshots

![Screenshot 2025-03-27 025845](https://github.com/user-attachments/assets/b86eb248-d355-4caf-8586-53916b87a71f)


## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/mern-github-app.git
   cd mern-github-app
   ```

2. **Install server dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory with the following content:

     ```
     MONGO_URI=your_mongodb_connection_string
     ```

5. **Run the application**:

   - Start the server:

     ```bash
     cd backend
     npm start
     ```

   - Start the client:

     ```bash
     cd ../frontend
     npm start
     ```

6. **Access the application**:

   Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements
- Deployed using [Render](https://render.com/)
