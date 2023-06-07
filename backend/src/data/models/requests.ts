import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { 
	Length, 
	Validate
} from "class-validator";
import Services from "./services";
import TypeRequest from "./typeRequest";
import { checkStatus_id } from "../validation";

enum status_id {
	waiting = 1,
	accepted = 2,
	rejected = 3,
	inWork = 4,
	skipped = 5,
	completed = 6
}


@Entity()
class Requests extends BaseEntity {
	@PrimaryGeneratedColumn()
		request_id: number;

	@Column({
		type: "enum",
		enum: status_id,
		default: status_id.waiting,
	})
	@Validate(checkStatus_id, {message: "Недопустимый статус!"})
		status_id: status_id;
	@Column()
	@Length(2, 8)
		unique_code: string;
	@ManyToOne(()=> Services)
	@JoinColumn({name: "service_id", referencedColumnName: "service_id", foreignKeyConstraintName: "requestService_id"})
		service: Services;
	@ManyToOne(()=> TypeRequest)
	@JoinColumn({name: "typeRequest_id", referencedColumnName: "typeRequest_id", foreignKeyConstraintName: "requestTypeRequest_id"})
		TypeRequest: TypeRequest;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}
export { Requests };
