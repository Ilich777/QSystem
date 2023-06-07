/** 
	/web/userRouter.ts - User management router
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
import usersRepository from "../data/repos/usersRepository";
import { 
	isAuth,
	allow
} from "./service/AuthServices";

const userRouter = Router();
userRouter.put("/setOperator",
	isAuth,
	allow("admin", async (req: any, res: any) => {
		const { 
			user_id,
			service_id
		} = req.body; 
		try {
			const user = await usersRepository.setOperator(user_id, service_id);
			res.json(user);
		} catch(e: any) {
			res.status(400).json(e.message);
		}
	}));

export { userRouter };
