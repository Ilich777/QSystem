/** 
	/web/servicesRouter.ts - Services management router
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
import servicesRepository from "../data/repos/servicesRepository";


const servicesRouter = Router();
servicesRouter.get("/",async (_: any, res: any) => {
	try {
		const allServices = await servicesRepository.getServices();
		if (allServices.length !== 0) {
			if (allServices[2].service_id === 3)
				allServices.pop();
			res.json(allServices);
		}
		else 
			res.json("Services not found");
	} catch(e: any) {
		res.status(400).json(e.message);
	}
});

export { servicesRouter };
