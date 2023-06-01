import { request } from "../../web/requestsRouter";
import { Requests } from "../models/requests";
import Services from "../models/services";
import TypeRequest from "../models/typeRequest";
import moment from "moment";
import { 
	Equal,
	MoreThan
} from "typeorm";
import { dbCreateConnection } from "./../dbCreateConnection";
import { postgres } from "../../server";
import { Validator } from "class-validator";

interface Code {
	unique_code: string;
}
type bodyForCheck = {
	service: Services,
	typeRequest: TypeRequest
}
interface Request {
	unique_code: string,
	status_id: number,
	service_name: string
}
export interface RequestForSaving extends request, Code {}
class RequestRepository {
	async checkBeforeCreate(body:request):Promise<bodyForCheck> {
		let service: Services | null,
			typeRequest: TypeRequest | null;
		if (!Object.hasOwn(body, "service") || !Object.hasOwn(body, "TypeRequest"))
			throw new Error("Body is empty");
		try {
			service = await Services.findOneBy({service_id: body.service.service_id});
			if (!service || body.service.service_id === 3)
				throw new Error("Service unavailable");
			typeRequest = await TypeRequest.findOneBy({typeRequest_id: body.TypeRequest.typeRequest_id});
			if (!typeRequest)
				throw new Error("typeRequest unavailable");
		} catch (error: any) {
			throw new Error(error);
		}
		return {
			service: service,
			typeRequest: typeRequest
		};
		
	}
	async getUniqueCode(service_id:number):Promise<Code>{
		let letter,
			count,
			uniqueCode;
		const today = moment().utcOffset(6).format(moment.HTML5_FMT.DATE);
		try {
			letter = await Services.findOne({
				select:{
					code:true
				},
				where:{
					service_id
				}
			});
			count = await Requests.count({
				where: {
					service: Equal(service_id),
					createdAt: MoreThan(new Date(today))
				}
			}) + 1;
		} catch(e:any) {
			throw new Error(e);
		}

		if(letter?.code === undefined){
			throw new Error("Error building unique code");
		} else {
			uniqueCode =  letter?.code + count;
		}
		return { unique_code: uniqueCode };
	}
	async create(body: bodyForCheck, code: Code):Promise<Requests>{
		const request = new Requests();
		request.unique_code = code.unique_code;
		request.service = body.service;
		request.TypeRequest = body.typeRequest;
		try { 
			await request.save();
			return request;
		} catch (error: any) {
			throw new Error(error);
		}

	}
	
	async getTodayRequests(service_id: number):Promise<Request[]>{
		const today = moment().utcOffset(6).format(moment.HTML5_FMT.DATE);

		const connection = await dbCreateConnection(postgres);
		const result: Request[] = await connection.query("SELECT unique_code, status_id, s.service_name FROM requests r INNER JOIN services s USING(service_id) WHERE service_id=$1 AND r.\"createdAt\" > $2 AND status_id =$3", [service_id, today, 1]);

		return result;
	}

	async getStatus(request_id: number) : Promise<number> {
		try {
			const request = await Requests.findOne({
				select: {
					status_id: true
				},
				where: {
					request_id
				}
			});
			if(request?.status_id !== undefined)
				return request.status_id;
			else
				throw new Error("Request not found");
		} catch (e: any) {
			throw new Error(e);
		}

		
	}

	async changeStatus(req_id: number, status_id: number) : Promise<boolean> {
		try {
			const request = await Requests.findOne({where:{
				request_id: req_id
			}});
			if (request !== null) {
				request.status_id = status_id;
				const validator = new Validator();
				await validator.validate(request).then(errors => {
					if (errors.length > 0) {
						const [er] = errors;
						if (er.constraints !== undefined)
							throw new Error(er?.constraints["Status_id"]);

					}
				});
				await request.save();
				return true;
			} else {
				throw new Error("User not found!");
			}
		} catch (e:any) {
			throw new Error(e);
		}
	} 

}
export default new RequestRepository();
