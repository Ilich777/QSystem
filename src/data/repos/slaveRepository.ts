const slaveRepositoryInit = () => {
	async function getAllSlaves() {
		//const records = await Slave.findAll({raw: true});
		//return records;
	}

	return {
		getAllSlaves
	};
};

export = slaveRepositoryInit;
