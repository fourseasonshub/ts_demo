/* 
装饰器：装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性、或参数上，可以修改类的行为。

通俗的讲装饰器就是一个方法，可以注入到类、方法、属性、参数上来扩展类、属性、方法、参数的功能

常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器

装饰器的写法：普通装饰器（无法传参）、装饰器工厂

装饰器是过去几年中js最大的成就之一，以时ES7的标准特性之一

 */

// 生成tsconfig.json：tsc --init
/*  如果tsc xxx.ts加tsconfig.json报错
    用tsc myFileName.ts --target ES5 -w --experimentalDecorators 
*/

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

// 方法装饰器一
// function logMethod(params) {
//     return function (target: any, methodName: any, desc: any) {
//         console.log(params);
//         console.log(target);
//         console.log(methodName);
//         console.log(desc);
//         target.apiUrl = 'xxx';
//         target.run = function() {
//             console.log('run');
//         }
//     }
// }

// class HttpClient5 {
//     public apiUrl: string | undefined;
//     constructor() {
//     }
//     @logMethod('https://www.google.com')
//     getData() {
//         console.log(this.apiUrl);
//     }
// }

// var http5: any = new HttpClient5();
// console.log(http5.apiUrl);
// http5.run();

// 方法装饰器二
// function logMethod(params) {
//     return function (target: any, methodName: any, desc: any) {
//         console.log(params);
//         console.log(target);
//         console.log(methodName);
//         console.log(desc);
//         console.log(desc.value); // 第三个参数desc中的value代表方法装饰器装饰的方法

//         // 修改方法装饰器装饰的方法，功能是把传入方法的所有参数改为string类型

//         // 1、保存当前的方法
//         var oldMethod = desc.value;

//         // 2、修改方法，这种是直接替换了原来的getData方法
//         // desc.value = function(...args: any[]) {
//         //     args = args.map(value => {
//         //         return String(value);
//         //     })
//         //     console.log(args);
//         // }

//         // 3、修改方法，这种是修改getData方法，不替换
//         desc.value = function (...args: any[]) {
//             args = args.map(value => {
//                 return String(value);
//             })
//             // 用apply调用旧方法，传入当前this
//             // this代表新方法
//             oldMethod.apply(this, args);
//         }

//     }
// }

// class HttpClient6 {
//     public apiUrl: string | undefined;
//     constructor() {
//     }
//     @logMethod('https://www.google.com')
//     getData(...args: any[]) {
//         console.log('我是getData里面的方法');
//         console.log('args', args);

//     }
// }

// var http6: any = new HttpClient6();
// http6.getData(123, 'xxx');

// 参数装饰器
// function logParams(params: any) {
//     return function(target: any, methodName: any, paramIndex: any) {
//         console.log(params);
//         console.log(target);
//         console.log(methodName);
//         console.log(paramIndex);

//         // 为类的原型增加一些元素数据
//         target.apiUrl = params;
//     }
// }


// class HttpClient8 {
//     public apiUrl: string | undefined;
//     constructor() {
//     }
//     getData(@logParams('xxxx') uuid: any) { // 调用方法时首先会执行这个装饰器
//         console.log(uuid);

//     }
// }

// var http8: any = new HttpClient8(); 
// http8.getData(123456);
// console.log(http8.apiUrl);

// 装饰器执行顺序
function logClass1(params: string) {
    return function(target: any) {
       console.log('类装饰器1');
    }
}

function logClass2(params: string) {
    return function(target: any) {
       console.log('类装饰器2');
    }
}

function logAttr(params?: string) {
    return function(target: any, attr: any) {
       console.log('属性装饰器');
    }
}

function logMethod(params?: string) {
    return function(target: any, methodName: any, desc: any) {
       console.log('方法装饰器');
    }
}

function logParams1(params?: string) {
    return function(target: any, methodName: any, paramIndex: any) {
       console.log('参数装饰器1');
    }
}

function logParams2(params?: string) {
    return function(target: any, methodName: any, paramIndex: any) {
       console.log('参数装饰器2');
    }
}

@logClass1('http://www.itying.com/api')  // 传参
@logClass2('xxx')  // 传参
class HttpClient {
    @logAttr()
    public apiUrl: string | undefined;
    constructor() {

    }
    @logMethod()
    getData() {
        return true;
    }

    setData(@logParams1() attr1: any, @logParams2() attr2: any) {

    }
}

var http: any = new HttpClient();