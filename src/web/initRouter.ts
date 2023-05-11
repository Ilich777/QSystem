import express from "express";

const initRouterInit = (masterRepos: any) => {
	const router = express.Router();

	router.get("/", async (req: any , res: any) => {
		const {masterAndSlave} = req.body;
		//check body
		//...
		console.log(await masterRepos.createMasterAndSlaves(masterAndSlave));
		res.send("Ok");
	});
	return router;
};

export = initRouterInit;
