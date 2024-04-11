import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CandidateProfile } from "./CandidateProfile.entity.js";

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => CandidateProfile, candidateProfile => candidateProfile.skills)
    candidateProfile!: CandidateProfile;

    @Column()
    skill!: string;

    @Column()
    yearsOfExperience!: number;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @Column({ type: "boolean", default: false})
    isVerified!: boolean;
}