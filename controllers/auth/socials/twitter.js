import dotenv from "dotenv";
import passport from "passport";
import twitterStrategy from "passport-twitter";
import createUserFromSocial from "./createUserFromSocial";

dotenv.config();

const TwitterStrategy = twitterStrategy.Strategy;
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_HOST}/auth/twitter/callback`,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const user = await createUserFromSocial(profile);
      return user
        ? done(null, user)
        : done(new Error("An error occurs , please try again later"));
    }
  )
);

export default passport;
