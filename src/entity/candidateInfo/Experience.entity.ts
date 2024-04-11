import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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

    @Column()
    location!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column()
    description!: string;

    @Column()
    isCurrentlyWorking!: boolean;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @Column()
    deletedAt!: Date;

    @Column()
    isVerified!: boolean;
}