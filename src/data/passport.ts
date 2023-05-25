import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import { passportCreds } from "../server";
import decode from "jwt-decode";
import Users from "./models/users";
import Services from "./models/services";
interface Payload {
	unique_name: string,
	commonname: string
}
const strategyCallback = async function (__: any, refreshToken: any, ___: any, done: any) {

	const payloadJwt = refreshToken.id_token,
		payload : Payload = decode(payloadJwt),
		login = payload.unique_name,
		user_name = payload.commonname;
	let findedUser,
		lowerLogin;

	if(login !== undefined) {
		try {
			const tempArray = login.split("\\"),
				newLogin = tempArray.pop();
			lowerLogin = newLogin?.toLowerCase();
			if(lowerLogin !== undefined)
				findedUser = await Users.findOneBy({login: lowerLogin});
			else 
				throw new Error("Fell off while unpacking");
		} catch(e:any) {
			throw new Error(e);
		}
	} else {
		throw new Error("missing uniquename in payload");
	}

	if(findedUser === null) {
		const user = new Users();
		user.user_name = user_name;
		user.login = lowerLogin;
		try {
			const service = await Services.findOneBy({service_name: "undefined"});
			if(service !== null) {
				user.service = service;
				await user.save();
			} else 
				throw new Error("service not found");
		} catch(e: any) {
			throw new Error(e);
		}
	}

	done(null, {
		login: findedUser?.login,
		role: findedUser?.role
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

