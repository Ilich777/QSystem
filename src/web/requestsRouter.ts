import { Router } from "express";
import requestRepository from "../data/repos/requestRepository";

const requestsRouter = Router();
requestsRouter.post("/",async (req: any, res: any) => {
	const { body } = req;
	try {
		await requestRepository.check(body);
		const code = await requestRepository.getUniqueCode(body.service.service_id);
		Object.assign(body, code);
		await requestRepository.create(body);
		res.status(201).json(code);
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});

export { requestsRouter };
