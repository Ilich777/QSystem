import { Router } from "express";
import requestRepository from "../data/repos/requestRepository";
import { 
	isAuth,
	allow
} from "./service/AuthServices";

const requestsRouter = Router();
import { io } from "../server";
requestsRouter.post("/",async (req: any, res: any) => {
	const { body } = req;
	try {
		await requestRepository.check(body);
		const code = await requestRepository.getUniqueCode(body.service.service_id);
		Object.assign(body, code);
		await requestRepository.create(body);
		const serv_1 = io.of("/service_1");
		serv_1.emit("message", {
			name: "Создана новая заявка"
		});
		res.status(201).json(code);
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});
requestsRouter.get("/", 
	isAuth,
	allow("operator", async (_: any, __: any) => {
		await requestRepository.getTodayRequests();
	}));

export { requestsRouter };
