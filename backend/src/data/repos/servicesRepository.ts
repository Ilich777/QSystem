import Services from "../models/services";

class ServicesRepository {
	public async init() : Promise<boolean> {
		const countField 	= await Services.count();
		if (countField === 0) {
			const servicesList = [
				{
					service_name: "Школа информационных технологий",
					abbreviation: "ШИТ",
					code: "A"
				},
				{
					service_name: "Школа бизнеса и предпринимательства",
					abbreviation: "ШБП",
					code: "B"
				}
			];
			for(let i = 0; i < servicesList.length; i++) {
				const s = new Services();
				
				s.service_name = servicesList[i].service_name;
				s.abbreviation = servicesList[i].abbreviation;
				s.code = servicesList[i].code;
				await s.save();
			}
			return true;	
		}
		return false;
	}
	public async getServices(): Promise<Services[]> {
		try { 
			const services = await Services.find({
				select: {
					service_id: true,
					service_name: true,
					abbreviation: true
				}
			});
			return services;
		} catch (error: any) {
			throw new Error(error);
		}

	}
}
export default new ServicesRepository();
