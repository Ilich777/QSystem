import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { 
	Length
} from "class-validator";

@Entity()
class VestnikViews extends BaseEntity {
	@PrimaryGeneratedColumn()
		view_id: number;
	@Column()
	@Length(4, 20)
		edition: string;
	@Column({
		default: 0
	})
	@Length(8, 50)
		view_count: number;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}
export { VestnikViews };
