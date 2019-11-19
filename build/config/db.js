"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
console.log(path_1.default.resolve(__dirname));
console.log(process.env.PWD);
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection({
            "type": "sqlite",
            "database": "database.sqlite",
            "synchronize": true,
            "logging": true,
            "entities": [process.env.PWD + "/entity/**/*.*"],
            "migrations": ["src/migration/**/*.ts"],
            "subscribers": ["src/subscriber/**/*.ts"],
            "cli": {
                "entitiesDir": process.env.PWD + "/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            }
        });
    });
}
exports.default = dbConnection;
