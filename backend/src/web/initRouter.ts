/** 
	/web/initRouter.ts - Initialization management router
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
