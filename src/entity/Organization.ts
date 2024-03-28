import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Job } from "./Job";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

//Defining separate class for contact details

class ContactDetails {
    @Column()
    phone!: string;

    @Column()
    email!: string;

    @Column()
    postalAddress!: string;

    @Column()
    website!: string;
}

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    location!: string;

    @Column(() => ContactDetails)
    contactDetails!: ContactDetails;

    //Deifining one-to-many relationship between Organization and Job
    @OneToMany(() => Job, job => job.organization)
    jobs!: Job[];
}