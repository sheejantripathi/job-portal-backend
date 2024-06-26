// src/entity/Job.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Organization } from "./Organization.entity.js";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    salaryRange!: string

    // Defining many-to-one relationship between Job and Organization
    @ManyToOne(() => Organization, organization => organization.jobs, {nullable: true})
    organization!: Organization | null;
}
