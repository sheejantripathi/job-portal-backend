import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CandidateProfile } from "./CandidateProfile.entity.js";

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => CandidateProfile, candidateProfile => candidateProfile.experiences)
    candidateProfile!: CandidateProfile;

    @Column()
    companyName!: string;

    @Column()
    position!: string;

    @Column({nullable: true})
    location!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column({nullable: true})
    description!: string;

    @Column({ type: "boolean", default: false})
    isCurrentlyWorking!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ type: "boolean", default: false})
    isVerified!: boolean;
}