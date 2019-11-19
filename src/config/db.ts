import { createConnection } from "typeorm";
import path from "path"

console.log(path.resolve(__dirname));
console.log(process.env.PWD);



async function dbConnection() {
    await createConnection({
        "type": "sqlite",
        "database": "database.sqlite",
        "synchronize": true,
        "logging": true,
        "entities": [process.env.PWD+"/entity/**/*.*"],
        "migrations": ["src/migration/**/*.ts"],
        "subscribers": ["src/subscriber/**/*.ts"],
        "cli": {
            "entitiesDir": process.env.PWD+"/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }); 
}

export default dbConnection;
