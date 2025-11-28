import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "../prismaClient.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // Busca al usuario por el ID que está en el token (payload.sub)
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        return done(null, false); // token válido pero usuario no existe
      }

      return done(null, user); // usuario encontrado
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
