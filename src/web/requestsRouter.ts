import { Router } from "express";
import requestRepository from "../data/repos/requestRepository";
import { 
	isAuth,
	allow
} from "./service/AuthServices";
type request = {
	service: {
        service_id: number
    },
    TypeRequest: {
        typeRequest_id: number
    }
}
const requestsRouter = Router();
import { io } from "../server";
requestsRouter.post("/",async (req: any, res: any) => {
	const { body } = req;
	try {
		const service = await requestRepository.check(body);
		const code = await requestRepository.getUniqueCode(body.service.service_id);
		Object.assign(body, code);
		const request = await requestRepository.create(body);
		const client = io.of(`/${code.unique_code[0]}`);
		client.emit("create", {
			status: "B ожидании",
			code: request.unique_code,
			service: service.abbreviation
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
