//подключение модулей
import Express from "express";
import bodyParser from "body-parser";
import { env } from "process";

const server	= Express(),
	morgan 		= require("morgan");

let PORT!: number,
	postgres: any;

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

//импорт подключения к PostgreSQL
import { dbCreateConnection } from "./data/dbCreateConnection";

dbCreateConnection(postgres)
	.then(() => {
		//middlewares
		server.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(morgan("dev"));
		
		const initRouter = require("./web/initRouter")(),
			requestsRouter = require("./web/requestsRouter")();
			
		//подключение контроллеров
		server.use("/init", initRouter);
		server.use("/requests", requestsRouter);
	});


server.listen(PORT, async () => {
	env["isProd"] === "false" ? 
		console.log(`http://localhost:${PORT}`) :
		console.log("https://q.ektu.kz");
});
