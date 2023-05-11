import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity
} from "typeorm";
import { Length } from "class-validator";


@Entity()
class TypeRequest extends BaseEntity {
	@PrimaryGeneratedColumn()
		typeRequest_id: number;
	@Column()
	@Length(5, 50)
		master_name: string;
}
export = TypeRequest;
