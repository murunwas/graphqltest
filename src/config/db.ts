import { createConnection } from "typeorm";




async function dbConnection(path:string) {
    await createConnection({
        "type": "sqlite",
        "database": "database.sqlite",
        "synchronize": true,
        "logging": true,
        "entities": [path+"/entity/**/*.*"],
        "migrations": ["src/migration/**/*.ts"],
        "subscribers": ["src/subscriber/**/*.ts"],
        "cli": {
            "entitiesDir": path+"/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }); 
}

export default dbConnection;
