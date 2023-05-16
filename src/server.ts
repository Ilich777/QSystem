//подключение модулей
import Express from "express";
import bodyParser from "body-parser";
import { env } from "process";
import http from "http";
import { Server } from "socket.io";

const app	= Express(),
	morgan 		= require("morgan"),
	server = http.createServer(app);
	
export const io = new Server(server);
const s1 = io.of("/service_1");
io.of("/service_2");

let PORT!: number,
	postgres: any;

//импорт подключения к PostgreSQL
import { dbCreateConnection } from "./data/dbCreateConnection";

//импорт роутеров
import { initRouter } from "./web/initRouter";
import { requestsRouter } from "./web/requestsRouter";
import { servicesRouter } from "./web/servicesRouter";

if (!Object.hasOwn(env, "NODE_ENV") || env["NODE_ENV"] == "development") {
	console.log("Development mode");

	// подключение конфига
	const  config = require("./data/conf/config");
	PORT = config.PORT;
	postgres = config.postgres;
	env["isProd"] = "false";

} else if (env["NODE_ENV"] == "production") {
	console.log("Production mode");
	PORT = env?.["PORT"] !== undefined? +env?.["PORT"] : 3000;
	postgres = JSON.parse(env["POSTGRES"] !== undefined? env["POSTGRES"] : "{}");
	env["isProd"] = "true";
}

dbCreateConnection(postgres)
	.then(() => {
		//middlewares
		app.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(morgan("dev"));
			
		s1.on("connection", () => {
			console.log("a user connected");
		});
		

		//подключение роутеров к эндпоинтам
		app.use("/init", initRouter);
		app.use("/requests", requestsRouter);
		app.use("/services", servicesRouter);
	});

server.listen(PORT, async () => {
	env["isProd"] === "false" ? 
		console.log(`http://localhost:${PORT}`) :
		console.log("https://q.ektu.kz");
});
