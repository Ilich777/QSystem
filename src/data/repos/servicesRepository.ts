import Services from "../models/services";

class ServicesRepository {
	public async init() : Promise<boolean> {
		const countField 	= await Services.count();
		if (countField === 0) {
			const servicesList = [
				{
					service_name: "Школа информационных технологий",
					abbreviation: "ШИТ",
					code: "A",
					window: 1
				},
				{
					service_name: "Школа бизнеса и предпринимательства",
					abbreviation: "ШБП",
					code: "B",
					window: 2
				}
			];
			for(let i = 0; i < servicesList.length; i++) {
				const s = new Services();
				
				s.service_name = servicesList[i].service_name;
				s.abbreviation = servicesList[i].abbreviation;
				s.code = servicesList[i].code;
				s.window = servicesList[i].window;
				await s.save();
			}
			return true;	
		}
		return false;
	}
}
export default new ServicesRepository();
