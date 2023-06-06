import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Requests } from "./models/requests";
import requestRepository from "./repos/requestRepository";

const status_id =  {
	waiting: 1,
	accepted: 2,
	rejected: 3,
	inWork: 4,
	skipped: 5,
	completed: 6
};

const availableStatus_id = {
	[status_id.waiting]: [status_id.accepted, status_id.rejected],
	[status_id.accepted]: [status_id.inWork, status_id.skipped],
	[status_id.rejected]: [],
	[status_id.inWork]: [status_id.completed],
	[status_id.skipped]: [],
	[status_id.completed]: []
};

@ValidatorConstraint({ name: "Status_id", async: false })
export class checkStatus_id implements ValidatorConstraintInterface {
	async validate(newStatusId: number, args: ValidationArguments) {
		const { request_id } = args.object as Requests;
		const status_id = await requestRepository.getStatus(request_id);
		if (status_id === null) 
			return false;
		if (availableStatus_id[status_id].includes(newStatusId) === true)
			return true;
		else
			return false;
	}

	/*defaultMessage() {
		return "Недопустимый статус!";
	}*/
}
