import { VestnikViews } from "../models/vestnik_views";
class VestnikViewsRepository {
	public async getViews(edition:string): Promise<number> {
		try{
			const views = await VestnikViews.findOneBy({
				edition: edition
			});
			if(views !== null){
				const viewWithIncrement = ++views.view_count;
				views.view_count = viewWithIncrement;
				await views.save();
				return viewWithIncrement;
			} else {
				throw new Error("Wrong edition");
			}
		} catch(e:any) {
			throw new Error(e);
		}
	}
}
export default new VestnikViewsRepository();
