//подключение модулей
import Express from "express";
import bodyParser from "body-parser";
import { env } from "process";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = Express(),
	server = http.createServer(app);

export const io = new Server(server);
const s1 = io.of("/service_1");
io.of("/service_2");

let PORT!: number,
	postgres: any,
	sessionOption: any,
	passportCreds: any;

export { passportCreds };

//импорт роутеров
import { initRouter } from "./web/initRouter";
import { requestsRouter } from "./web/requestsRouter";
import { servicesRouter } from "./web/servicesRouter";
import { authRouter } from "./web/authRouter";

if (!Object.hasOwn(env, "NODE_ENV") || env["NODE_ENV"] == "development") {
	console.log("Development mode");
	
	// подключение конфига
	const config = require("./data/conf/config");
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
		s1.on("connection", () => {
			console.log("a user connected");
		});

		//подключение роутеров к эндпоинтам
		app.use("/auth", authRouter);
		app.use("/init", initRouter);
		app.use("/requests", requestsRouter);
		app.use("/services", servicesRouter);
	});

server.listen(PORT, async () => {
	env["isProd"] === "false" ?
		console.log(`http://localhost:${PORT}`) :
		console.log("https://q.ektu.kz");
});
