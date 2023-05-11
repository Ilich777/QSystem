import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinColumn
} from "typeorm";
import { 
	IsInt,
	Length
} from "class-validator";
import Services from "./services";
import TypeRequest from "./typeRequest";


@Entity()
class Requests extends BaseEntity {
	@PrimaryGeneratedColumn()
		request_id: number;

	@Column()
	@IsInt()
		status_id: number;
	@Column()
	@Length(2, 8)
		unique_code: string;
	@ManyToOne(()=> Services)
	@JoinColumn({name: "service_id", referencedColumnName: "service_id", foreignKeyConstraintName: "requestService_id"})
		service: Services;
	@ManyToOne(()=> TypeRequest)
	@JoinColumn({name: "typeRequest_id", referencedColumnName: "typeRequest_id", foreignKeyConstraintName: "requestTypeRequest_id"})
		TypeRequest: TypeRequest;
}
export = Requests;
