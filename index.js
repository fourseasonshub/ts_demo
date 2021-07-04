/*
装饰器：装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性、或参数上，可以修改类的行为。

通俗的讲装饰器就是一个方法，可以注入到类、方法、属性、参数上来扩展类、属性、方法、参数的功能

常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器

装饰器的写法：普通装饰器（无法传参）、装饰器工厂

装饰器是过去几年中js最大的成就之一，以时ES7的标准特性之一

 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 类装饰器在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。传入一个参数（此参数为当前类，其实是当前类的构造函数）
// 普通装饰器
// 这是一个装饰器
// function logClass(params: any) {
//     console.log(params);
//     // params就是当前类，其实是当前类的构造函数
//     // 那么我们就可以通过params在当前类上扩展属性和方法
//     params.prototype.apiUrl = '动态扩展的属性';
//     params.prototype.run = function() {
//         console.log('我是一个run方法');
//     }
// }
// 类装饰器的作用是可以动态的扩展类的属性和方法
// 在不修改这个类（类的声明）的前提下，来扩展类的功能
// @logClass
// class HttpClient {
//     constructor() {
//     }
//     getData() {
//     }
// }
// var http: any = new HttpClient();
// console.log(http.apiUrl);
// http.run();
// 类装饰器
// 装饰器工厂（可传参）
// function logClass2(params: string) {
//     return function(target: any) {
//         console.log('target', target); // target代表当前类，其实是当前类的构造函数
//         console.log('params', params); // params代表传入的参数
//         target.prototype.apiUrl = params;
//     }
// }
// @logClass2('http://www.itying.com/api')  // 传参
// class HttpClient2 {
//     constructor() {
//     }
//     getData() {
//     }
// }
// var http2: any = new HttpClient2();
// console.log('http2', http2.apiUrl);
// function logClass3(target: any) {
//     console.log(target);
//     return class extends target {
//         apiUrl: any = '我是修改后的数据';
//         getData() {
//             this.apiUrl = this.apiUrl + '------';
//             console.log(this.apiUrl);
//         }
//     }
// }
// @logClass3
// class HttpClient3 {
//     public apiUrl: string | undefined;
//     constructor() {
//         this.apiUrl = '我是构造函数里面的apiUrl';
//     }
//     getData() {
//         console.log(this.apiUrl);
//     }
// }
// var http3: any = new HttpClient3();
// console.log(http3.apiUrl);
// 属性装饰器（装饰器工厂写法）
// function logProperty(params: any) {
//     return function (target: any, attr: any) {
//         console.log(params); // 传入的参数
//         console.log(target);// 当前类的原型对象
//         console.log(attr); // 属性装饰器修饰的属性名
//         // 修改属性值
//         target[attr] = params;
//     }
// }
// class HttpClient4 {
//     @logProperty('https://www.google.com')
//     public apiUrl: string | undefined;
//     constructor() {
//     }
//     getData() {
//         console.log(this.apiUrl);
//     }
// }
// var http4: any = new HttpClient4();
// console.log(http4.apiUrl);
function logMethod(params) {
    return function (target, methodName, desc) {
        console.log(params);
        console.log(target);
        console.log(methodName);
        console.log(desc);
    };
}
var HttpClient5 = /** @class */ (function () {
    function HttpClient5() {
    }
    HttpClient5.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    __decorate([
        logMethod('https://www.google.com')
    ], HttpClient5.prototype, "getData");
    return HttpClient5;
}());
