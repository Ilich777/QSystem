import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	BaseEntity
} from "typeorm";
import Master from "./master";

@Entity()
class Slave extends BaseEntity {
	@PrimaryGeneratedColumn()
		slave_id: number;

	@Column({
		length: 50
	})
		slave_name: string;
	@ManyToOne(() => Master)
	@JoinColumn({ name: "master_id"})
		master: Master;
}

export = Slave;
