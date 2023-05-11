import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity
} from "typeorm";
import { 
	IsInt,
	Length
} from "class-validator";


@Entity()
class Services extends BaseEntity {
	@PrimaryGeneratedColumn()
		service_id: number;

	@Column()
	@Length(8, 50)
		service_name: string;
	@Column()
	@Length(2, 15)
		abbreviation: string;
	@Column()
	@Length(1, 2)
		code: string;
	@Column()
	@IsInt()
		window: number;
	
}
export = Services;
