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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const users_1 = __importDefault(require("./routes/users"));
exports.prisma = new client_1.PrismaClient();
const app = express_1.default();
app.use(express_1.default.json());
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.get('/', (_, res) => {
        res.send("connected");
    });
    app.use('/users', users_1.default);
    app.listen(process.env.PORT || 4000, () => {
        console.log('listening on port 4000');
    });
});
main().catch((err) => {
    console.log(`ERROR: ${err}`);
}).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
//# sourceMappingURL=index.js.map