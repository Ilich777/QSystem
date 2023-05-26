import { Router } from "express";
import typeRequestRepository from "../data/repos/typeRequestRepository";
import servicesRepository from "../data/repos/servicesRepository";
import { 
	allow,
	isAuth 
} from "./service/AuthServices";

const initRouter = Router();

initRouter.get("/", 
	isAuth, 
	allow("operator", async (_: any , res: any) => {
		const trr = await typeRequestRepository.init();
		const sr = await servicesRepository.init();
		
		const status = trr && sr;
		res.send(status);
	}));

export { initRouter };
