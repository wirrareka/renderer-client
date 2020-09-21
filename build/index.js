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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var environment = process.env.NODE_ENV || 'development';
var DefaultURL = environment === 'production' ? 'https://renderer.quanto.sk' : 'http://localhost:4000';
var RendererClient = /** @class */ (function () {
    function RendererClient(token, url) {
        var _this = this;
        if (url === void 0) { url = DefaultURL; }
        this.streamToData = function (stream) { return __awaiter(_this, void 0, void 0, function () {
            var chunks, streamData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chunks = [];
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                stream.on('data', function (chunk) { return chunks.push(chunk); });
                                stream.on('error', reject);
                                stream.on('end', function () { return resolve(Buffer.concat(chunks).toString('base64')); });
                            })];
                    case 1:
                        streamData = _a.sent();
                        return [2 /*return*/, streamData];
                }
            });
        }); };
        this.stream = function (templateCode, format, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var params, url, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = "return_type=document&regenerate=true";
                            url = "/renders/" + templateCode + "." + format + "?" + params;
                            return [4 /*yield*/, this.axios.post(url, { data: data, options: options }, {
                                    responseType: 'stream'
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            });
        };
        this.print = function (templateCode, format, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var stream;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.stream(templateCode, format, data, options)];
                        case 1:
                            stream = _a.sent();
                            return [2 /*return*/, this.streamToData(stream)];
                    }
                });
            });
        };
        this.pdf = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.print(templateCode, 'pdf', data, options)];
                });
            });
        };
        this.xls = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.print(templateCode, 'xlsx', data, options)];
                });
            });
        };
        this.csv = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.print(templateCode, 'csv', data, options)];
                });
            });
        };
        this.pdfStream = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.stream(templateCode, 'pdf', data, options)];
                });
            });
        };
        this.xlsStream = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.stream(templateCode, 'xlsx', data, options)];
                });
            });
        };
        this.csvStream = function (templateCode, data, options) {
            if (data === void 0) { data = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.stream(templateCode, 'csv', data, options)];
                });
            });
        };
        this.axios = axios_1.default.create({
            baseURL: url + "/api",
            headers: {
                authorization: "Bearer " + token
            }
        });
    }
    return RendererClient;
}());
exports.RendererClient = RendererClient;
