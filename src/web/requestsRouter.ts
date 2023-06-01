import { Router } from "express";
import requestRepository from "../data/repos/requestRepository";
import { 
	isAuth,
	allow
} from "./service/AuthServices";

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
requestsRouter.post("/create",async (req: any, res: any) => {
	const body : request = req.body;
	try {
		const serviceAndTypeRequest = await requestRepository.checkBeforeCreate(body),
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
requestsRouter.get("/", 
	isAuth,
	allow("operator", async (req: any, res: any) => {
		if (req.user !== undefined) {
			const requests = await requestRepository.getTodayRequests(req.user.service_id);
			res.json(requests);
		}
	}));

requestsRouter.put("/setStatus/:request_id",async (req: any, res: any) => {
	try {
		const { request_id } = req.params,
			{ status_id } = req.body;
		await requestRepository.changeStatus(request_id, status_id);
		res.json("Status changed successfully!");

	} catch (error: any) {
		console.log(error);
		res.status(400).json(error.message);
	}
});

export { requestsRouter };
