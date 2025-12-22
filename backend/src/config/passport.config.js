import dotenv from "dotenv";
dotenv.config(); // <--- THIS IS THE KEY FIX

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user.model.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            profilePic: profile.photos[0]?.value || "",
            authProvider: "google",
          });
        }

        done(null, user);
      } catch (error) {
        console.error("Google auth error:", error);
        done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
            fullName: profile.displayName || profile.username,
            profilePic: profile.photos[0]?.value || "",
            authProvider: "github",
          });
        }

        done(null, user);
      } catch (error) {
        console.error("GitHub auth error:", error);
        done(error, null);
      }
    }
  )
);

export default passport;