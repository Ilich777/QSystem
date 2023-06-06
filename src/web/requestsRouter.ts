/** 
	/web/requestsRouter.ts - Request management router
    Copyright (C) 2023  Ilya Zhukov <ilyazhukov24@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
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
