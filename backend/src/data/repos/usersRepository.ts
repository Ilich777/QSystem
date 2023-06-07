import Users from "../models/users";
import Services from "../models/services";
import { Equal } from "typeorm";
import { userRolesConfig as roles } from "../userRoles";

class UserRepository {
	public async setOperator(user_id: number, service_id: number): Promise<Users> {
		try { 
			const user = await Users.findOne({
				where:{
					user_id
				}
			});
			if(service_id === 3)
				throw new Error("service unavailable");
			const service = await Services.findOne({
				where:{
					service_id
				}
			});
			const countUsers = await Users.count({
				where:{
					service: Equal(service_id)
				}
			});
			const increment = countUsers + 1;
			if (user !== null){
				if (user.number !== null)
					throw new Error("user already operator");
				if(service !== null)
				{
					user.service = service;
					user.number = service.code + String(increment);
					user.role = roles.roles.operator;
					user.save();
					return user;

				} else {
					throw new Error("service not found");
				}

			}
			else
				throw new Error("user not found");
		} catch (error: any) {
			throw new Error(error);
		}

	}
}
export default new UserRepository();
