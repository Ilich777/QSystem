import { Router } from "express";
import servicesRepository from "../data/repos/servicesRepository";

const servicesRouter = Router();
servicesRouter.get("/",async (_: any, res: any) => {
	try {
		const allServices = await servicesRepository.getServices();
		res.json(allServices);
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});

export { servicesRouter };
