import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import { passportCreds/*, postgres */} from "../server";
import decode from "jwt-decode";
import Users from "./models/users";
import Services from "./models/services";
import { userRolesConfig as roles } from "./userRoles";
//import { dbCreateConnection } from "./dbCreateConnection";
interface Payload {
	unique_name: string,
	commonname: string
}
const strategyCallback = async function (_: any, __: any, refreshToken: any, ___: any, done: any) {

	const payloadJwt = refreshToken.id_token,
		payload : Payload = decode(payloadJwt),
		login = payload.unique_name,
		user_name = payload.commonname;
	let findedUser,
		lowerLogin = "";
	//const ds = await dbCreateConnection(postgres);	

	if(login !== undefined) {
		try {
			const tempArray = login.split("\\");
			const newLogin = tempArray.pop(); 
			if(newLogin !== undefined)
				lowerLogin = newLogin.toLowerCase();
			try {
				findedUser = await Users.findOne({
					relations:{
						service: true
					},
					where:{
						login: lowerLogin
					}
				});
			} catch(e:any) {
				throw new Error(`${e}`);
			}
		} catch(e:any) {
			throw new Error(e);
		}
	} else {
		throw new Error("missing uniquename in payload");
	}
	
	/*let FUser: {
		login: string,
		role: string,
		service_id: number
	} = {
		login: "",
		role: "",
		service_id: 1
	};*/
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
		done("Contact administrator");
	} else if(roles.accessLevels.operator.includes(findedUser.role)) {
		/*dbCreateConnection(postgres)
			.then(async (connection)=>{
				FUser = await connection.query("SELECT login, role, service_id FROM users WHERE login=$1", [lowerLogin]);
				console.log(FUser);
			
				
			});*/
		done(null, {
			login: findedUser?.login,
			role: findedUser?.role,
			service_id: findedUser?.service.service_id
		});
	} else {
		done("Contact administrator");
	}
			
			
};

const strategy = new OAuth2Strategy({ ...passportCreds }, strategyCallback);

passport.use("login", strategy);

passport.serializeUser(function (user: any, done: any) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
	done(null, user);
});
