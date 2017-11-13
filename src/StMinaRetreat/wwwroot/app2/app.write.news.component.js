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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var News = /** @class */ (function () {
    function News() {
    }
    return News;
}());
exports.News = News;
var NEWS = { title: "", news: "" };
var WriteNewsComponent = /** @class */ (function () {
    function WriteNewsComponent(http) {
        this.http = http;
        this.news = NEWS;
        this.onEditorKeyup = new core_1.EventEmitter();
    }
    WriteNewsComponent.prototype.ngOnInit = function () { this.getNews(); };
    WriteNewsComponent.prototype.getNews = function () {
        var _this = this;
        this.http.get('./api/SiteNews').subscribe(function (data) { return _this.news = data.json(); });
    };
    WriteNewsComponent.prototype.setNews = function () {
        var _this = this;
        debugger;
        this.http.post('./api/SiteNews', this.news).subscribe(function (res) { return _this.getNews(); });
    };
    WriteNewsComponent.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    WriteNewsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        tinymce.init({
            selector: 'textarea',
            toolbar: 'undo redo | link image media',
            file_picker_types: 'image',
            paste_data_images: true,
            relative_urls: false,
            convert_urls: false,
            remove_script_host: false,
            images_upload_handler: function (blob, success, failure) {
                tinymce.activeEditor.execCommand("mceInsertContent", false, "<img src='" + blob + "'");
            },
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    var file = input.files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function (e) {
                            cb(reader.result);
                        };
                    }
                };
                input.click();
            },
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor imagetools"
            ],
            setup: function (editor) {
                debugger;
                _this.editor = editor;
                editor.on('change', function () {
                    var content = editor.getContent();
                    _this.news.news = content;
                });
            },
        });
    };
    WriteNewsComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WriteNewsComponent.prototype, "onEditorKeyup", void 0);
    WriteNewsComponent = __decorate([
        core_1.Component({
            selector: 'write-news',
            templateUrl: 'app2/templates/write-news.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], WriteNewsComponent);
    return WriteNewsComponent;
}());
exports.WriteNewsComponent = WriteNewsComponent;
//# sourceMappingURL=app.write.news.component.js.map