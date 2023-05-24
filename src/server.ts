//подключение модулей
import express from "express";
import bodyParser from "body-parser";
import { env } from "process";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cookieParser from "cookie-parser";
import passport from "passport";

const app  = express(),
	server = http.createServer(app);

export const io = new Server(server);
const s1 = io.of(/^\/[A-Z]{1}$/);
//io.of("/B");

import { Config } from "./data/types/Config";

//Без этого работать не будет
let PORT: Config["PORT"] = 3000,
	postgres: Config["postgres"] = {
		type: "postgres",
		host: "test.test",
		username: "test",
		password: "test",
		database: "test",
		synchronize: true,
		logging: false,
		entities: ["test1"]
	},
	sessionOption: Config["sessionOption"] = {
		secret: "test",
		cookie: {
			domain: "test",
			httpOnly: true,
			maxAge: 3600000,
			path: "test",
			sameSite: "lax"
		},
		name: "test",
		resave: false,
		rolling: true,
		saveUninitialized:false
	},
	passportCreds: Config["passportCreds"];

export { passportCreds };

//импорт роутеров
import { initRouter } from "./web/initRouter";
import { requestsRouter } from "./web/requestsRouter";
import { servicesRouter } from "./web/servicesRouter";
import { authRouter } from "./web/authRouter";
import { userRouter } from "./web/userRouter";

if (!Object.hasOwn(env, "NODE_ENV") || env["NODE_ENV"] == "development") {
	console.log("Development mode");
	
	// подключение конфига
	const { config } = require("./data/conf/config");
	PORT = config.PORT;
	postgres = config.postgres;
	sessionOption = config.sessionOption;
	passportCreds = config.passportCreds;
	env["isProd"] = "false";
	
} else if (env["NODE_ENV"] == "production") {
	console.log("Production mode");
	PORT = env["PORT"];
	postgres = JSON.parse(env["POSTGRES"]);
	sessionOption = JSON.parse(env["SESSION"]);
	passportCreds = JSON.parse(env["OAuth2Creds"]);
	env["isProd"] = "true";
}

const FileStore = sessionFileStore(session);

//middlewares
app.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(morgan("dev"))
	.use(cookieParser())
	.use(session(Object.assign(sessionOption, { store: new FileStore() })))
	.use(passport.initialize())
	.use(passport.session());
	
//импорт подключения к PostgreSQL
import { dbCreateConnection } from "./data/dbCreateConnection";
import "./data/passport";


dbCreateConnection(postgres)
	.then(() => {
		s1.on("connection", (socket) => {
			console.log(`a user ${socket.nsp.name[1]} connected`);
			/*socket.on("connection", (socket) => {
				console.log("a user connected");
			});*/
			socket.on("disconnect", () => {
				console.log(`a user ${socket.nsp.name[1]} disconnected`);
			});
		});

		//подключение роутеров к эндпоинтам
		app.use("/auth", authRouter);
		app.use("/init", initRouter);
		app.use("/requests", requestsRouter);
		app.use("/services", servicesRouter);
		app.use("/users", userRouter);
	});

server.listen(PORT, async () => {
	env["isProd"] === "false" ?
		console.log(`http://localhost:${PORT}`) :
		console.log("https://q.ektu.kz");
});
