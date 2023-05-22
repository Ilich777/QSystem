import { Router, Request, Response } from "express";
import servicesRepository from "../data/repos/servicesRepository";

const servicesRouter = Router();
servicesRouter.get("/",async (_: Request, res: Response) => {
	try {
		const allServices = await servicesRepository.getServices();
		res.json(allServices);
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});

export { servicesRouter };
