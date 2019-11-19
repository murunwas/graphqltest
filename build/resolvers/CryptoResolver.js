"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const type_graphql_1 = require("type-graphql");
const axios_1 = __importDefault(require("axios"));
let TestDTO = class TestDTO {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDTO.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDTO.prototype, "img", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TestDTO.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], TestDTO.prototype, "zar", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], TestDTO.prototype, "usd", void 0);
TestDTO = __decorate([
    type_graphql_1.ObjectType()
], TestDTO);
let CryptoResolver = class CryptoResolver {
    crypto() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { data, status } } = yield axios_1.default.get("https://myapi.ga/");
                if (status) {
                    return data.map((coin) => {
                        const me = new TestDTO();
                        const [zar, usd] = coin.value;
                        me.title = coin.key;
                        me.img = `https://www.cryptocompare.com${coin.info.img}`;
                        me.name = coin.info.fullname;
                        me.zar = zar.amount;
                        me.usd = usd.amount;
                        return me;
                    });
                }
            }
            catch (error) {
            }
            return [new TestDTO()];
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [TestDTO]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CryptoResolver.prototype, "crypto", null);
CryptoResolver = __decorate([
    type_graphql_1.Resolver()
], CryptoResolver);
exports.CryptoResolver = CryptoResolver;
