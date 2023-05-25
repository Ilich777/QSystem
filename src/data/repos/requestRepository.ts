import { request } from "../../web/requestsRouter";
import Requests from "../models/requests";
import Services from "../models/services";
import TypeRequest from "../models/typeRequest";
import moment from "moment";
import { 
	Equal,
	MoreThan
} from "typeorm";

interface Code {
	unique_code: string;
}
type bodyForCheck = {
	service: Services,
	typeRequest: TypeRequest
}
export interface RequestForSaving extends request, Code {}
class RequestRepository {
	async check(body:request):Promise<bodyForCheck> {
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
	async getTodayRequests():Promise<boolean>{
		const today = moment().utcOffset(6).format(moment.HTML5_FMT.DATE);
		await Requests.find({select:{
			unique_code: true,
			status_id: true
		},
		where:{
			createdAt: MoreThan(new Date(today))
		}});
		return true;
	}
}
export default new RequestRepository();
