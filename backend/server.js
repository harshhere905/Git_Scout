import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import connectMongoDB from './db/connectMongoDB.js';
import "./passport/github.auth.js";

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));

app.get('/', (req, res) => {
    res.send("server is ready");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
    console.log("server is running");
    connectMongoDB();
});
