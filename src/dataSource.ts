// src/data-source.ts
import { DataSource } from "typeorm";

// Import other entities

export const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "sheejan",
    "password": "nevermore123",
    "database": "myJobPortal",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"]
  }
  );
