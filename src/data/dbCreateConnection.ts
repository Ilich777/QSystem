import { DataSource } from "typeorm";
import { Config } from "./types/Config";
export const dbCreateConnection = async (postgres: Config["postgres"]): Promise<DataSource>=> {
	const ds = new DataSource({
		type: postgres.type,
		host: postgres.host,
		database: postgres.database,
		username: postgres.username,
		password: postgres.password,
		synchronize: postgres.synchronize,
		logging: postgres.logging,
		entities: postgres.entities
	});
	const connection = ds;
	connection.initialize()
		.then(() => {
			console.log("DB Connected");
		})
		.catch((er) => {
			console.log(er);
		});
	return ds;
};
