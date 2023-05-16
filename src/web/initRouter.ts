import express from "express";
import typeRequestRepository from "../data/repos/typeRequestRepository";
import servicesRepository from "../data/repos/servicesRepository";

const initRouterInit = () => {
	const router = express.Router();

	router.get("/", async (_: any , res: any) => {
		const trr = await typeRequestRepository.init();
		const sr = await servicesRepository.init();
		
		const status = trr && sr;
		res.send(status);
	});
	return router;
};

export = initRouterInit;
