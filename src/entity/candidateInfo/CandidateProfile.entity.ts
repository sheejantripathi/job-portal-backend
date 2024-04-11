import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany  } from "typeorm";
import { User } from "./User.entity.js";
import { Education } from "./Education.entity.js";
import { Experience } from "./Experience.entity.js";
import { Skills } from "./Skills.entity.js";

@Entity()
export class CandidateProfile {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, user => user.candidateProfile)
    user!: User

    @OneToMany(() => Education, education => education.candidateProfile, {cascade: true})
    educations: Education[] = [];

    @OneToMany(() => Experience, experience => experience.candidateProfile, {cascade: true})
    experiences : Experience[] = [];

    @OneToMany(() => Skills, skills => skills.candidateProfile, {cascade: true})
    skills: Skills[] = [];

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

    @Column()
    passwordHash!: string;

}