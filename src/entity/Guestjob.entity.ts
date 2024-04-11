// src/entity/Job.ts
import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

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
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column({nullable: true})
    salaryRange?: string

    @Column(() => GuestOrganizationDetails)
    organizationDetails!: GuestOrganizationDetails;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}
