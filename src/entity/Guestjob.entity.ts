// src/entity/Job.ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

class GuestOrganizationDetails {
    @Column()
    name!: string;

    @Column({nullable: true})
    phone?: string;

    @Column()
    email!: string;

    @Column({nullable: true})
    postalAddress?: string;

    @Column()
    website!: string;
}

@Entity()
export class GuestJob {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column({nullable: true})
    salaryRange?: string

    @Column(() => GuestOrganizationDetails)
    organizationDetails!: GuestOrganizationDetails;
}
