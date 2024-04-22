import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @Column({nullable: true})
    fieldOfStudy!: string;

    @Column()
    startDate!: number;

    @Column()
    endDate!: number;

    @Column({nullable: true})
    grade!: string;

    @Column({nullable: true})
    activities!: string;

    @Column({nullable: true})
    description!: string;

    @Column({ type: "boolean", default: false})
    isCurrentlyStudying!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ type: "boolean", default: false})
    isVerified!: boolean;

}