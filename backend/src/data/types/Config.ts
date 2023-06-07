interface Config  {
    PORT: number;
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
			sameSite: boolean | "lax" | "strict" | "none" | undefined;
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
		clientSecret: string;
		callbackURL: string;
		passReqToCallback: false | undefined;
	};
}
export { Config };
