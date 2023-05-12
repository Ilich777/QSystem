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
	//console.log(postgres);
} else if (env["NODE_ENV"] == "production") {
	console.log("Production mode");
	PORT = env?.["PORT"] !== undefined? +env?.["PORT"] : 3000;
	postgres = JSON.parse(env["POSTGRES"] !== undefined? env["POSTGRES"] : "{}");
	env["isProd"] = "true";
}

//импорт подключения к PostgreSQL
import { dbCreateConnection } from "./data/dbCreateConnection";

//инициализация моделей
dbCreateConnection(postgres)
	.then(() => {
		//middlewares
		server.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(morgan("dev"));
		
		//подключение моделей
		/*Master.initialize(sequelize);
		Slave.initialize(sequelize);
		
		sequelize.sync({ alter: true });*/
		
		/*require("./data/models/master")(sequelize);
		require("./data/models/slave")(sequelize);*/
		//подключение методов
		const masterRepository = require("./data/repos/masterRepository")(),
			slaveRepository = require("./data/repos/slaveRepository")();
		
		//подключение контроллеров
		const initRouter = require("./web/initRouter")(masterRepository, slaveRepository);
		
		server.use("/init", initRouter);

	});


server.listen(PORT, async () => {
	env["isProd"] === "false" ? 
		console.log(`http://localhost:${PORT}`) :
		console.log("https://q.ektu.kz");

	
});
