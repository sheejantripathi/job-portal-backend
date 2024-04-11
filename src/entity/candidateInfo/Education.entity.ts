import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CandidateProfile } from "./CandidateProfile.entity.js";

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => CandidateProfile, candidateProfile => candidateProfile.educations)
    candidateProfile!: CandidateProfile;

    @Column()
    institution!: string;

    @Column()
    degree!: string;

    @Column()
    fieldOfStudy!: string;

    @Column()
    startYear!: number;

    @Column()
    endYear!: number;

    @Column()
    grade!: string;

    @Column()
    activities!: string;

    @Column()
    description!: string;

    @Column()
    isCurrentlyStudying!: boolean;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @Column()
    deletedAt!: Date;

    @Column()
    isVerified!: boolean;

}