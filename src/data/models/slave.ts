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
	/*@OneToMany(() => Slave, (slaves) => slaves.master, {
		cascade: true, onDelete: "CASCADE"
	})*/
	@ManyToOne(() => Master)
	@JoinColumn({ name: "master_id"})
		master: Master;
}

export = Slave;
