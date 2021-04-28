"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.processNewChangeData = exports.changeEventGenerator = exports.processCreationDataHelper = exports.specialCreationMessageEnum = void 0;
var pageViewHelperFunction = __importStar(require("./pageViewHelperFunction"));
var specialCreationMessageEnum;
(function (specialCreationMessageEnum) {
    specialCreationMessageEnum["createNewFullPageObject"] = "createNewFullPageObject";
    specialCreationMessageEnum["createNewOverviewPageObject"] = "createNewOverviewPageObject";
})(specialCreationMessageEnum = exports.specialCreationMessageEnum || (exports.specialCreationMessageEnum = {}));
function processCreationDataHelper(mainController, creationData) {
    return __awaiter(this, void 0, void 0, function () {
        var specialCreationMessage, objectData, newHTMLObject, newPageItemData, newSmallViewItemData, _newPageObjectData, _newSmallViewObjectData, fullPageModeDiv, overviewModeDiv, _a, newPage, smallView, parentHTMLObject;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, creationData.specialCreationMessage];
                case 1:
                    specialCreationMessage = _b.sent();
                    objectData = mainController.getObjectById(creationData.objectID);
                    console.log(12121212, "----------", objectData);
                    console.log(12121212, creationData);
                    if (specialCreationMessage == specialCreationMessageEnum.createNewFullPageObject || specialCreationMessage == specialCreationMessageEnum.createNewOverviewPageObject) { // do something special if there is spcial creation message
                        mainController.pageCurrentStatus.pendingObject.newPageArray.push(creationData);
                        // if there are two item in the array, then clear it and create a new object
                        if (mainController.pageCurrentStatus.pendingObject.newPageArray.length == 4) {
                            newPageItemData = mainController.pageCurrentStatus.pendingObject.newPageArray[0];
                            newSmallViewItemData = mainController.pageCurrentStatus.pendingObject.newPageArray[1];
                            _newPageObjectData = mainController.getObjectById(newPageItemData.objectID);
                            _newSmallViewObjectData = mainController.getObjectById(newSmallViewItemData.objectID);
                            fullPageModeDiv = document.querySelector(".fullPageModeDiv");
                            overviewModeDiv = document.querySelector(".overviewModeDiv");
                            _a = pageViewHelperFunction.createNewPage(mainController.pageCurrentStatus, fullPageModeDiv, overviewModeDiv, _newPageObjectData, _newSmallViewObjectData, false), newPage = _a[0], smallView = _a[1];
                            pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
                            mainController.pageCurrentStatus.pendingObject.newPageArray = [];
                        }
                    }
                    if (!creationData.specialCreationMessage) {
                        newHTMLObject = mainController.createGNObjectThroughName(objectData.GNType, { name: "", arrayID: "", insertPosition: false, dataPointer: false, saveToDatabase: false });
                        newHTMLObject.initializeHTMLObjectFromData(objectData);
                        parentHTMLObject = mainController.getHtmlObjectByID(creationData.parentHTMLObjectId);
                        // console.log("action = create", creationData.objectID, parentHTMLObject, objectData, newHTMLObject)
                        if (parentHTMLObject) {
                            parentHTMLObject.appendChild(newHTMLObject);
                        }
                    }
                    return [4 /*yield*/, newHTMLObject];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.processCreationDataHelper = processCreationDataHelper;
function changeEventGenerator(array) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5 /*yield**/, __values(array)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.changeEventGenerator = changeEventGenerator;
function processNewChangeData(mainController, generator, changeItem) {
    return __awaiter(this, void 0, void 0, function () {
        var changeData, updateFinished, _object, objectData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    changeData = changeItem.value;
                    if (!(changeData.action == "create")) return [3 /*break*/, 2];
                    return [4 /*yield*/, processCreationDataHelper(this, changeData)];
                case 1:
                    updateFinished = _a.sent();
                    processNewChangeData(mainController, generator, generator.next());
                    _a.label = 2;
                case 2:
                    if (changeData.action == "update") {
                        _object = document.querySelector("*[accessPointer='" + changeData.objectID + "']");
                        objectData = mainController.getObjectById(changeData.objectID);
                        _object.reloadDataFromDatabase();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.processNewChangeData = processNewChangeData;
