import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToOne,
	JoinColumn
} from "typeorm";
import { 
	Length
} from "class-validator";
import Services from "./services";


@Entity()
class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
		user_id: number;
	@Column()
	@Length(8, 50)
		user_name: string;
	@Column()
	@Length(2, 15)
		role: string;
	@OneToOne(() => Services)
	@JoinColumn({name: "service_id", referencedColumnName: "service_id", foreignKeyConstraintName: "userService_id"})
		service: Services;
}
export = Users;
