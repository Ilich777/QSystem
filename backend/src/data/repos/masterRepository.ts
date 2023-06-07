import Master from "../models/master";
import Slave from "../models/slave";
interface IMaster {
	master_name: string
}
/*interface ISlave {
	slave_name: string,
	master: IMaster
}*/
const masterRepositoryInit = (): any => {
	async function getAllMasters() {
		/*const {
			Master
		} = sequelize.models;*/
		try{
			/*const records = await Master.findAll({raw: true});
			return records;*/

		} catch(e) {
			console.log(e);
		}
	}

	async function createMasterAndSlaves(/*masterAndSlave : IMasterAndSlave*/) : Promise<IMaster | undefined>  {
		const master = new Master();
		master.master_name = "admin";

		const slave1 = new Slave();
		slave1.slave_name = "user1";
		slave1.master = master;
		
		const slave2 = new Slave();
		slave2.slave_name = "user2";
		slave2.master = master;
		let result;
		
		try {
			result = await master.save();
			await slave1.save();
			await slave2.save();
			return result;
		} catch (error:any) {
			throw new Error(error);
		}
	}

	return {
		getAllMasters,
		createMasterAndSlaves
	};
};

export = masterRepositoryInit;
