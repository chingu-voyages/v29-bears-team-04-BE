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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = void 0;
const index_1 = require("../index");
const seedDB = (i) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.prisma.photo.create({
        data: {
            title: "Title" + i,
            imageUrl: "https://source.unsplash.com/random",
            category: "Nature",
            author: {
                connect: { id: 2 }
            }
        }
    });
    yield index_1.prisma.photo.create({
        data: {
            title: "Title" + i,
            category: "Space",
            imageUrl: "https://source.unsplash.com/weekly",
            author: {
                connect: { id: 3 }
            }
        }
    });
});
exports.seedDB = seedDB;
//# sourceMappingURL=seedDB.js.map