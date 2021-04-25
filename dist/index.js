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
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
exports.prisma = new client_1.PrismaClient();
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.use(express_1.default.json());
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? ".herokuapp.com" : undefined,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
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