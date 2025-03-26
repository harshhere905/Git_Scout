import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate("github", { failureRedirect: process.env.CLIENT_BASE_URL + "/login" }),
    (req, res) => {
        res.redirect(process.env.CLIENT_BASE_URL);
    }
);

router.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user });
    } else {
        res.send({ user: null });
    }
});

router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });

        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: "Error destroying session" });

            res.clearCookie("connect.sid", { path: '/' });
            res.json({ message: "Logged out successfully" });
        });
    });
});

export default router;
