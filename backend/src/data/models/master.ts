import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity
} from "typeorm";


@Entity()
class Master extends BaseEntity {
	@PrimaryGeneratedColumn()
		master_id: number;

	@Column({
		length: 50
	})
		master_name: string;
}
export = Master;
