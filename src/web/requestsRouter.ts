import { Router } from "express";
import requestRepository from "../data/repos/requestRepository";
/*import { 
	isAuth,
	allow
} from "./service/AuthServices";*/
export type request = {
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
	const body : request = req.body;
	try {
		const serviceAndTypeRequest = await requestRepository.check(body),
			code = await requestRepository.getUniqueCode(body.service.service_id),
			request = await requestRepository.create(serviceAndTypeRequest, code),
			client = io.of(`/${code.unique_code[0]}`);
		client.emit("create", {
			status: "B ожидании",
			code: request.unique_code,
			service: serviceAndTypeRequest.service.service_name
		});
		res.status(201).json(code);
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});
/*requestsRouter.get("/", 
	isAuth,
	allow("operator", async (_: any, __: any) => {
		await requestRepository.getTodayRequests();
	}));*/

export { requestsRouter };
