import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import { passportCreds } from "../server";
import jwt from "jsonwebtoken";

const strategyCallback = async function (_: any, __:any, refreshToken: any, ___: any, done: any) {

	const payloadJwt = refreshToken.id_token,
		{ payload } = jwt.decode(payloadJwt, { complete: true });
	console.log(payload);
	done(null, {
		user: "good user"
	});

};

const strategy = new OAuth2Strategy({ ...passportCreds }, strategyCallback);

passport.use("login", strategy);

passport.serializeUser(function (user: any, done: any) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
	done(null, user);
});

export { passport };

