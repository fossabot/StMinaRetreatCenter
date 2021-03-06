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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
let NewsletterService = class NewsletterService {
    constructor(http) {
        this.http = http;
    }
    getNewsletterDirectories() {
        return this.http.get('api/Newsletters')
            .map((r) => r.json())
            .catch(this.handleError);
    }
    getNewsletters(path) {
        return this.http.get('api/Newsletters/' + path)
            .map((r) => r.json())
            .catch(this.handleError);
    }
    getNewsLetter(path) {
        var options = new http_2.RequestOptions({
            headers: new http_2.Headers({ 'Content-Type': 'application/pdf' }),
            responseType: http_2.ResponseContentType.Blob
        });
        return this.http.get('api/Newsletters/' + path, options)
            .map((response) => response.blob())
            .catch(this.handleError);
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    }
};
NewsletterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NewsletterService);
exports.NewsletterService = NewsletterService;
//# sourceMappingURL=newsletterservice.js.map