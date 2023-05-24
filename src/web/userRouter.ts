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
