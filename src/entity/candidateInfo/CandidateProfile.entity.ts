import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert  } from "typeorm";
import { Education } from "./Education.entity.js";
import { Experience } from "./Experience.entity.js";
import { Skills } from "./Skills.entity.js";
import * as bcrypt from "bcrypt";

export enum GenderType {
    Male = "MALE",
    Female = "FEMALE",
    Others = "OTHERS",
    NotDefined = "NOT_DEFINED"
}

@Entity()
export class CandidateProfile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true, nullable: false})
    email!: string;
    
    @Column({ unique: true, nullable: false})
    phone!: string;

    @Column({ type: "date", nullable: true})
    dob!: Date;

    @Column({nullable: false})
    password!: string;

    @Column({
        type: "enum",
        enum: GenderType,
        default: GenderType.NotDefined
    })
    gender!: GenderType;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Education, education => education.candidateProfile, {cascade: true})
    educations!: Education[];

    @OneToMany(() => Experience, experience => experience.candidateProfile, {cascade: true})
    experiences!: Experience[];

    @OneToMany(() => Skills, skills => skills.candidateProfile, {cascade: true})
    skills!: Skills[];

    // Hash password before saving to the database
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); //10 rounds of salting included
    }
    
}