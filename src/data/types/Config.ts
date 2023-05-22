type Config = {
    PORT: 3000;
    postgres:  {
		type: "postgres";
		host: string;
		username: string;
		password: string;
		database: string;
		synchronize: boolean;
		logging: boolean;
		entities: string[];
	};
    sessionOption: {
		secret: string;
		cookie: {
			domain: string;
			httpOnly: boolean;
			maxAge: number;
			path: string;
			sameSite: string;
		};
		name: string;
		resave: boolean;
		rolling: boolean;
		saveUninitialized: boolean;
	};
    passportCreds: {
		authorizationURL: string;
		tokenURL: string;
		clientID: string;
		callbackURL: string;
		passReqToCallback: boolean;
	};
}
export { Config };
