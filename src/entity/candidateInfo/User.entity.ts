import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { CandidateProfile } from "./CandidateProfile.entity.js";

export enum GenderType {
    Male = "MALE",
    Female = "FEMALE",
    Others = "OTHERS",
    NotDefined = "NOT_DEFINED"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;
    
    @Column()
    phone!: string;

    @Column()
    dob!: Date;

    @Column({
        type: "enum",
        enum: GenderType,
        default: GenderType.NotDefined
    })
    gender!: GenderType;

    @Column()
    passwordHash!: string;

    //Link the user entity with the candidate profile entity
    @OneToOne(() => CandidateProfile, candidateProfile => candidateProfile.user, {cascade: true})
    @JoinColumn()
    candidateProfile!: CandidateProfile;
}