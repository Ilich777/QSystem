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
class RequestRepository {
	async check(body:Requests):Promise<boolean> {
		let service: Services | null,
			typeRequest: TypeRequest | null;
		if (!Object.hasOwn(body, "service") || !Object.hasOwn(body, "TypeRequest"))
			throw new Error("Body is empty");
		try {
			service = await Services.findOneBy({service_id: body.service.service_id});
			if (!service)
				throw new Error("Service unavailable");
			typeRequest = await TypeRequest.findOneBy({typeRequest_id: body.TypeRequest.typeRequest_id});
			if (!typeRequest)
				throw new Error("typeRequest unavailable");
		} catch (error: any) {
			throw new Error(error);
		}
		return true;
		
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
	async create(body: Requests):Promise<boolean>{
		const request = new Requests();
		request.unique_code = body.unique_code;
		request.service = body.service;
		request.TypeRequest = body.TypeRequest;
		try { 
			await request.save();
			return true;
		} catch (error: any) {
			throw new Error(error);
		}

	}
}
export default new RequestRepository();
