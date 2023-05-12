import express from "express";
import typeRequestRepository from "../data/repos/typeRequestRepository";
import servicesRepository from "../data/repos/servicesRepository";


const initRouterInit = (masterRepos: any) => {
	const router = express.Router();

	router.get("/", async (req: any , res: any) => {
		const {masterAndSlave} = req.body;
		//check body
		//...
		const trr = await typeRequestRepository.init();
		const sr = await servicesRepository.init();
		const status = trr && sr;
		res.send(status);
	});
	return router;
};

export = initRouterInit;
