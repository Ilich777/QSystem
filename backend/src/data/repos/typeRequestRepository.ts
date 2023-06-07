import TypeRequest from "../models/typeRequest";

class TypeRequestRepository {
	public async init() : Promise<boolean> {
		const tr 		= new TypeRequest(),
			countField 	= await TypeRequest.count();
		if (countField === 0) {
			tr.typeRequest_name = "Живая очередь";
			await tr.save();
			return true;	
		}
		return false;
	}
}
export default new TypeRequestRepository();
