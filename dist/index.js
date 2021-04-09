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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.get('/', (_, res) => {
        res.send("Hello World");
    });
    app.listen(4000, () => {
        console.log('listening on port 4000');
    });
});
main().catch((err) => {
    console.log(`ERROR: ${err}`);
});
//# sourceMappingURL=index.js.map