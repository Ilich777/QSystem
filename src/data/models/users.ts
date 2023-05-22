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
import { userRolesConfig } from "../userRoles";
const { roles } = userRolesConfig;
@Entity()
class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
		user_id: number;
	@Column()
	@Length(8, 50)
		user_name: string;
	@Column()
	@Length(8, 50)
		login: string;
	@Column({
		type: "enum",
		enum: roles,
		default: roles.guest,
	})
		role: typeof roles;
	@OneToOne(() => Services)
	@JoinColumn({name: "service_id", referencedColumnName: "service_id", foreignKeyConstraintName: "userService_id"})
		service: Services;
}
export = Users;
