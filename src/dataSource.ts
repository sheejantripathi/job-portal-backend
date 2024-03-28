// src/data-source.ts
import { DataSource } from "typeorm";
import path from "path";

// Import other entities

export const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "sheejan",
    "password": "12345",
    "database": "myjobportal",
    "synchronize": true,
    "logging": false,
    entities: [
      process.env.NODE_ENV === "development"
          ? "src/entity/**/*.entity.ts"
          : "dist/entity/**/*.entity.js",
  ],
  migrations: [
      process.env.NODE_ENV === "development"
          ? "src/migration/**/*.ts"
          : "dist/migration/**/*.js"
  ],
  subscribers: [
      process.env.NODE_ENV === "development"
          ? "src/subscriber/**/*.ts"
          : "dist/subscriber/**/*.js"
  ],
  }
  );
