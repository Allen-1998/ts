// JS的八种内置类型
{
  let str: string = "allen";
  let num: number = 24;
  let bool: boolean = false;
  let u: undefined = undefined;
  let n: null = null;
  let obj: object = { x: 1 };
  let big: bigint = 100n;
  let sym: symbol = Symbol("me");
}

// 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给其他类型。
// 如果你在tsconfig.json指定了"strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型。
// null和undefined赋值给string
{
  let str: string = "666";
  // str = null;
  // str = undefined;

  // null和undefined赋值给number
  let num: number = 666;
  // num = null;
  // num = undefined;

  // null和undefined赋值给object
  let obj: object = {};
  // obj = null;
  // obj = undefined;

  // null和undefined赋值给Symbol
  let sym: symbol = Symbol("me");
  // sym = null;
  // sym = undefined;

  // null和undefined赋值给boolean
  let isDone: boolean = false;
  // isDone = null;
  // isDone = undefined;

  // null和undefined赋值给bigint
  let big: bigint = 100n;
  // big = null;
  // big = undefined;
}

// 虽然number和bigint都表示数字，但是这两个类型不兼容。
{
  let big: bigint = 100n;
  let num: number = 6;
  // big = num;
  // num = big;
}

// 对数组类型的定义有两种方式：
{
  let arr: string[] = ["1", "2"];
  let arr2: Array<string> = ["1", "2"];

  // 定义联合类型数组
  let arr3: (number | string)[];
  // 表示定义了一个名称叫做arr的数组,
  // 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
  arr3 = [1, "b", 2, "c"];

  // 定义指定对象成员的数组：
  // interface是接口,后面会讲到
  interface Arrobj {
    name: string;
    age: number;
  }
  let arr4: Arrobj[] = [{ name: "jimmy", age: 22 }];
}

// 函数
{
  // 函数声明
  function sum(x: number, y: number): number {
    return x + y;
  }

  // 函数表达式
  let mySum: (x: number, y: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };

  // 用接口定义函数类型
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let SearchFun: SearchFunc = (source, subString) => {
    return true;
  };
  // SearchFun("1", 2);

  // 可选参数
  // 注意点：可选参数后面不允许再出现必需参数
  function buildName(firstName: string, lastName?: string) {
    if (lastName) {
      return firstName + " " + lastName;
    } else {
      return firstName;
    }
  }
  let tomcat = buildName("Tom", "Cat");
  let tom = buildName("Tom");

  // 参数默认值
  function buildName1(firstName: string, lastName: string = "Cat") {
    return firstName + " " + lastName;
  }
  let tomcat1 = buildName1("Tom", "Cat");
  let tom1 = buildName1("Tom");

  // 剩余参数
  function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
      array.push(item);
    });
  }
  let a: any[] = [];
  push(a, 1, 2, 3);

  // 函数重载
  // 函数会根据不同的参数而返回不同的类型的调用结果：
  type Types = number | string;
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: string, b: number): string;
  function add(a: number, b: string): string;
  function add(a: Types, b: Types) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  const result = add("Semlinker", " Kakuqo");
  result.split(" ");
}

// Tuple(元组)
{
  let tuple: [string, number];
  // 类型必须匹配且个数必须为2
  tuple = ["hello", 10]; // OK
  // tuple = ["hello", 10, 10]; // Error
  // tuple = [10, "hello"]; // Error

  // 元祖类型的解构赋值
  let employee: [number, string] = [1, "Semlinker"];
  let [id, username] = employee;
  console.log(`id: ${id}`);
  console.log(`username: ${username}`);

  // 元组类型的可选元素
  let optionalTuple: [string, boolean?];
  optionalTuple = ["Semlinker", true];
  console.log(`optionalTuple : ${optionalTuple}`);
  optionalTuple = ["Kakuqo"];
  console.log(`optionalTuple : ${optionalTuple}`);

  type Point = [number, number?, number?];

  const x: Point = [10]; // 一维坐标点
  const xy: Point = [10, 20]; // 二维坐标点
  const xyz: Point = [10, 20, 10]; // 三维坐标点

  console.log(x.length); // 1
  console.log(xy.length); // 2
  console.log(xyz.length); // 3

  // 元组类型的剩余元素
  type RestTupleType = [number, ...string[]];
  let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
  console.log(restTuple[0]);
  console.log(restTuple[1]);

  // 只读的元组类型
  // 在使用 readonly 关键字修饰元组类型之后，任何企图修改元组中元素的操作都会抛出异常：
  const point: readonly [number, number] = [10, 20];
  // Cannot assign to '0' because it is a read-only property.
  // point[0] = 1;
  // Property 'push' does not exist on type 'readonly [number, number]'.
  // point.push(0);
  // Property 'pop' does not exist on type 'readonly [number, number]'.
  // point.pop();
  // Property 'splice' does not exist on type 'readonly [number, number]'.
  // point.splice(1, 1);
}

// void
{
  // void表示没有任何类型，和其他类型是平等关系，不能直接赋值:
  let a: void;
  // let b: number = a; // Error

  // 方法没有返回值将得到undefined，但是我们需要定义成void类型，而不是undefined类型。否则将报错:
  function fun(): void {
    console.log("this is TypeScript");
  }
  fun();
}

// never
{
  // never类型同null和undefined一样，也是任何类型的子类型，也可以赋值给任何类型。
  // 但是没有类型是never的子类型或可以赋值给never类型（除了never本身之外），即使any也不可以赋值给never
  let ne: never;
  let nev: never;
  let an: any;

  // ne = 123; // Error
  // ne = nev; // OK
  // ne = an; // Error
  // 异常
  // ne = (() => {
  //   throw new Error("异常");
  // })(); // OK
  // 死循环
  // ne = (() => {
  //   while (true) {}
  // })(); // OK

  // 在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查
  type Foo = string | number;

  function controlFlowAnalysisWithNever(foo: Foo) {
    if (typeof foo === "string") {
      // 这里 foo 被收窄为 string 类型
    } else if (typeof foo === "number") {
      // 这里 foo 被收窄为 number 类型
    } else {
      // foo 在这里是 never
      const check: never = foo;
    }
  }
}

// any
{
  // 如果是 any 类型，则允许被赋值为任意类型。
  let a: any = 666;
  a = "Semlinker";
  a = false;
  a = 66;
  a = undefined;
  a = null;
  a = [];
  a = {};
  // 在any上访问任何属性都是允许的,也允许调用任何方法.
  let anyThing: any = "hello";
  // console.log(anyThing.myName);
  // console.log(anyThing.myName.firstName);
  let anyThing1: any = "Tom";
  // anyThing1.setName("Jerry");
  // anyThing1.setName("Jerry").sayHello();
  // anyThing1.myName.setFirstName("Cat");
}

// unknown
{
  // 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。
  // unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
  let notSure: unknown = 4;
  let uncertain: any = notSure; // OK

  let notSure1: any = 4;
  let uncertain1: unknown = notSure1; // OK

  let notSure2: unknown = 4;
  // let uncertain2: number = notSure2; // Error

  // 我们可以使用typeof、类型断言等方式来缩小未知范围：
  function getDogName() {
    let x: unknown;
    return x;
  }
  const dogName = getDogName();
  // 直接使用
  // const upName = dogName.toLowerCase(); // Error
  // typeof
  if (typeof dogName === "string") {
    const upName = dogName.toLowerCase(); // OK
  }
  // 类型断言
  // const upName = (dogName as string).toLowerCase(); // OK
}

// 不要使用对象类型（ Number、String、Boolean、Symbol 是相应原始类型的包装对象）来注解值的类型;
{
  let num: number; //推荐
  let Num: Number; //不推荐
  // Num = num; // ok
  // num = Num; // ts(2322)报错
}

// object、Object 和 {}
{
  // 小 object 代表的是所有非原始类型
  let lowerCaseObject: object;
  // lowerCaseObject = 1; // ts(2322)
  // lowerCaseObject = "a"; // ts(2322)
  // lowerCaseObject = true; // ts(2322)
  // lowerCaseObject = null; // ts(2322)
  // lowerCaseObject = undefined; // ts(2322)
  lowerCaseObject = {}; // ok

  // 大Object（等价于{}） 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。
  let upperCaseObject: Object;
  upperCaseObject = 1; // ok
  upperCaseObject = "a"; // ok
  upperCaseObject = true; // ok
  // upperCaseObject = null; // ts(2322)
  // upperCaseObject = undefined; // ts(2322)
  upperCaseObject = {}; // ok
}

// 类型推断
{
  // 具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。
  let a = 1;
  // a = '1'

  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1 = add1(1, 1); // 推断出 x1 的类型也是 number

  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  // const x3 = add2(1, "1"); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined

  // 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
  let myFavoriteNumber;
  myFavoriteNumber = "seven";
  myFavoriteNumber = 7;
}

// 类型断言
{
  const arrayNumber: number[] = [1, 2, 3, 4];
  // const greaterThan2: number = arrayNumber.find((num) => num > 2); // 提示 ts(2322)
  const greaterThan2: number = arrayNumber.find((num) => num > 2) as number;

  let someValue: any = "this is a string";
  let strLength: number = (someValue as string).length;
}

// 非空断言
{
  // ! 可以用于断言操作对象是非 null 和非 undefined 类型。
  let mayNullOrUndefinedOrString: null | undefined | string;
  // mayNullOrUndefinedOrString!.toString(); // ok
  // mayNullOrUndefinedOrString.toString(); // ts(2531)

  type NumGenerator = () => number;

  function myFunc(numGenerator: NumGenerator | undefined) {
    // Object is possibly 'undefined'.(2532)
    // Cannot invoke an object which is possibly 'undefined'.(2722)
    // const num1 = numGenerator(); // Error
    const num2 = numGenerator!(); //OK
  }
}

//确定赋值断言
{
  // 允许在实例属性和变量声明后面放置一个 ! 号，从而告诉 TypeScript 该属性会被明确地赋值
  let x!: number;
  initialize();

  // Variable 'x' is used before being assigned.(2454)
  console.log(2 * x); // Error
  function initialize() {
    x = 10;
  }
}

// 字面量类型;
{
  let specifiedStr: "this is string" = "this is string";
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;

  type Direction = "up" | "down";

  function move(dir: Direction) {
    // ...
  }
  move("up"); // ok
  // move("right"); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'

  interface Config {
    size: "small" | "big";
    isEnable: true | false;
    margin: 0 | 2 | 4;
  }
}

// let和const分析;
{
  const str = "this is string"; // str: 'this is string'
  const num = 1; // num: 1
  const bool = true; // bool: true

  let str1 = "this is string"; // str: string
  let num1 = 1; // num: number
  let bool1 = true; // bool: boolean
}

// 类型拓宽(Type Widening)
{
  let str = "this is string"; // 类型是 string
  let strFun = (str = "this is string") => str; // 类型是 (str?: string) => string;
  const specifiedStr = "this is string"; // 类型是 'this is string'
  let str2 = specifiedStr; // 类型是 'string'
  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;

  // 可以通过如下所示代码添加显示类型注解控制类型拓宽行为
  const specifiedStr3: "this is string" = "this is string"; // 类型是 '"this is string"'
  let str23 = specifiedStr3; // 即便使用 let 定义，类型是 'this is string'

  // 通过 let、var 定义的变量如果满足未显式声明类型注解且被赋予了 null 或 undefined 值，则推断出这些变量的类型是 any
  let x = null; // 类型拓宽成 any
  let y = undefined; // 类型拓宽成 any

  /** -----分界线------- */
  const z = null; // 类型是 null

  /** -----分界线------- */
  let anyFun = (param = null) => param; // 形参类型是 null
  let z2 = z; // 类型是 null
  let x2 = x; // 类型是 null
  let y2 = y; // 类型是 undefined

  {
    interface Vector3 {
      x: number;
      y: number;
      z: number;
    }

    function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
      return vector[axis];
    }

    // let x = "x";// type is "string"
    const x = "x"; // type is "x"
    let vec = { x: 10, y: 20, z: 30 };
    // 类型“string”的参数不能赋给类型“"x" | "y" | "z"”的参数。
    getComponent(vec, x); // Error
  }

  {
    const obj = {
      x: 1,
    };

    obj.x = 6; // OK
    // Type '"6"' is not assignable to type 'number'.
    // obj.x = "6"; // Error
    // Property 'y' does not exist on type '{ x: number; }'.
    // obj.y = 8; // Error
    // Property 'name' does not exist on type '{ x: number; }'.
    // obj.name = "semlinker"; // Error
  }

  // 提供显式类型注释
  // Type is { x: 1 | 3 | 5; }
  const obj: { x: 1 | 3 | 5 } = {
    x: 1,
  };

  // 使用 const 断言
  // Type is { x: number; y: number; }
  const obj1 = {
    x: 1,
    y: 2,
  };
  // Type is { x: 1; y: number; }
  const obj2 = {
    x: 1 as const,
    y: 2,
  };
  // Type is { readonly x: 1; readonly y: 2; }
  const obj3 = {
    x: 1,
    y: 2,
  } as const;
  // Type is number[]
  const arr1 = [1, 2, 3];
  // Type is readonly [1, 2, 3]
  const arr2 = [1, 2, 3] as const;
}

// 类型缩小(Type Narrowing)
{
  let func = (anything: any) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else if (typeof anything === "number") {
      return anything; // 类型是 number
    }
    return null;
  };

  let func1 = (anything: string | number) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else {
      return anything; // 类型是 number
    }
  };

  type Goods = "pen" | "pencil" | "ruler";
  const getPenCost = (item: "pen") => 2;
  const getPencilCost = (item: "pencil") => 4;
  const getRulerCost = (item: "ruler") => 6;
  const getCost = (item: Goods) => {
    if (item === "pen") {
      return getPenCost(item); // item => 'pen'
    } else if (item === "pencil") {
      return getPencilCost(item); // item => 'pencil'
    } else {
      return getRulerCost(item); // item => 'ruler'
    }
  };
  const getCost1 = (item: Goods) => {
    if (item === "pen") {
      item; // item => 'pen'
    } else {
      item; // => 'pencil' | 'ruler'
    }
  };

  // 处理一些特殊值时要特别注意
  // const el = document.getElementById("foo"); // Type is HTMLElement | null
  // if (typeof el === "object") {
  //   el; // Type is HTMLElement | null
  // }

  // 帮助类型检查器缩小类型的另一种常见方法是在它们上放置一个明确的 “标签”：
  interface UploadEvent {
    type: "upload";
    filename: string;
    contents: string;
  }

  interface DownloadEvent {
    type: "download";
    filename: string;
  }

  type AppEvent = UploadEvent | DownloadEvent;

  function handleEvent(e: AppEvent) {
    switch (e.type) {
      case "download":
        e; // Type is DownloadEvent
        break;
      case "upload":
        e; // Type is UploadEvent
        break;
    }
  }
}

// 交叉类型
{
  type Useless = string & number;

  type IntersectionType = { id: number; name: string } & { age: number };
  const mixed: IntersectionType = {
    id: 1,
    name: "name",
    age: 18,
  };

  type IntersectionTypeConfict = { id: number; name: string } & {
    age: number;
    name: number;
  };
  // const mixedConflict: IntersectionTypeConfict = {
  //   id: 1,
  //   name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
  //   age: 2,
  // };

  type IntersectionTypeConfict1 = { id: number; name: 2 } & {
    age: number;
    name: number;
  };

  let mixedConflict: IntersectionTypeConfict1 = {
    id: 1,
    name: 2, // ok
    age: 2,
  };
  // mixedConflict = {
  //   id: 1,
  //   name: 22, // '22' 类型不能赋给 '2' 类型
  //   age: 2,
  // };

  interface A {
    x: { d: true };
  }
  interface B {
    x: { e: string };
  }
  interface C {
    x: { f: number };
  }
  type ABC = A & B & C;
  let abc: ABC = {
    x: {
      d: true,
      e: "",
      f: 666,
    },
  };
}

// 任意属性
{
  interface Person {
    name: string;
    age?: number;
    // 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
    // [propName: string]: string;
    // [propName: string]: any;
    [propName: string]: string | number | undefined;
  }

  let tom: Person = {
    name: "Tom",
    gender: "male",
    test: 1,
  };
}

// 鸭式辨型法
{
  interface LabeledValue {
    label: string;
  }
  function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
  }
  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj); // OK
  // printLabel({ size: 10, label: "Size 10 Object" }); // Error
}

// 描述对象或函数的类型
{
  // Interface;
  interface Point {
    x: number;
    y: number;
  }

  interface SetPoint {
    (x: number, y: number): void;
  }

  // Type alias
  type Point1 = {
    x: number;
    y: number;
  };

  type SetPoint1 = (x: number, y: number) => void;

  // 接口可以定义多次,类型别名不可以
  interface Point {
    x: number;
  }
  interface Point {
    y: number;
  }
  const point: Point = { x: 1, y: 2 };

  // 接口扩展接口
  interface PointX {
    x: number;
  }

  interface Point extends PointX {
    y: number;
  }

  // 类型别名扩展类型别名
  type PointX2 = {
    x: number;
  };

  type Point2 = PointX2 & {
    y: number;
  };

  // 接口扩展类型别名
  type PointX3 = {
    x: number;
  };
  interface Point3 extends PointX3 {
    y: number;
  }

  // 类型别名扩展接口
  interface PointX4 {
    x: number;
  }
  type Point4 = PointX4 & {
    y: number;
  };
}

// 泛型
{
  // const identity = (arg: any) => arg;
  function identity<T>(arg: T): T {
    return arg;
  }
  identity("string").length; // ok
  // identity("string").toFixed(2); // err
  // identity(null).toString(); // err

  function identity1<T, U>(value: T, message: U): T {
    console.log(message);
    return value;
  }
  console.log(identity1<number, string>(68, "Semlinker"));
  console.log(identity1(68, "Semlinker"));
}

// 泛型约束
{
  // function trace<T>(arg: T): T {
  //   console.log(arg.size); // Error: Property 'size doesn't exist on type 'T'
  //   return arg;
  // }

  interface Sizeable {
    size: number;
  }
  function trace<T extends Sizeable>(arg: T): T {
    console.log(arg.size);
    return arg;
  }
}

// keyof
{
  interface Person {
    name: string;
    age: number;
  }

  type K1 = keyof Person; // "name" | "age"
  type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
  type K3 = keyof { [x: string]: Person }; // string | number

  let K1: keyof boolean; // let K1: "valueOf"
  let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
  let K3: keyof symbol; // let K1: "valueOf"

  // function prop(obj: object, key: string) {
  //   return obj[key];
  // }
  function prop<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  type Todo = {
    id: number;
    text: string;
    done: boolean;
  };

  const todo: Todo = {
    id: 1,
    text: "Learn TypeScript keyof",
    done: false,
  };
  const id = prop(todo, "id"); // const id: number
  const text = prop(todo, "text"); // const text: string
  const done = prop(todo, "done"); // const done: boolean
  // const date = prop(todo, "date"); // err
}

// in
{
  // in 用来遍历枚举类型：
  type Keys = "a" | "b" | "c";

  type Obj = {
    [p in Keys]: any;
  }; // -> { a: any, b: any, c: any }
}

// infer
{
  // 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

  // 如果泛型变量T是 () => infer R的`子集`，那么返回 通过infer获取到的函数返回值，否则返回boolean类型
  type Func<T> = T extends () => infer R ? R : boolean;

  let func1: Func<number>; // => boolean
  let func2: Func<"">; // => boolean
  let func3: Func<() => Promise<number>>; // => Promise<number>

  // 同上，但当a、b为不同类型的时候，返回不同类型的联合类型
  type Obj<T> = T extends { a: infer VType; b: infer VType } ? VType : number;

  let obj1: Obj<string>; // => number
  let obj2: Obj<true>; // => number
  let obj3: Obj<{ a: number; b: number }>; // => number
  let obj4: Obj<{ a: number; b: () => void }>; // => number | () => void
}

// 索引类型
{
  function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
    return keys.map((key) => person[key]);
  }

  interface Person {
    name: string;
    age: number;
  }

  const person: Person = {
    name: "musion",
    age: 35,
  };

  getValues(person, ["name"]); // ['musion']
  // getValues(person, ["gender"]); // 报错：
  // Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
  // Type "gender" is not assignable to type "name" | "age".
}

// 映射类型 根据旧的类型创建出新的类型, 我们称之为映射类型
{
  interface TestInterface {
    name: string;
    age: number;
  }
  // 我们可以通过+/-来指定添加还是删除
  type OptionalTestInterface<T> = {
    [p in keyof T]+?: T[p];
  };
  type OptionalTestInterface1<T> = {
    +readonly [p in keyof T]+?: T[p];
  };

  type newTestInterface = OptionalTestInterface<TestInterface>;
}

// 内置的工具类型
{
  // Partial<T> 将类型的属性变成可选
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  // 第二层以后就不会处理了，如果要处理多层，就可以自己实现
  type DeepPartial<T> = {
    // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
  };

  interface UserInfo {
    id: string;
    name: string;
    fruits: {
      appleNumber: number;
      orangeNumber: number;
    };
  }

  type NewUserInfo = DeepPartial<UserInfo>;
  // type NewUserInfo = Partial<UserInfo>;
  // Property 'appleNumber' is missing in type '{ orangeNumber: number; }' but required in type '{ appleNumber: number; orangeNumber: number; }'.
  const xiaoming: NewUserInfo = {
    name: "xiaoming",
    fruits: {
      orangeNumber: 1,
    },
  };

  // Required将类型的属性变成必选
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };

  // Readonly<T> 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  // Pick 从某个类型中挑出一些属性出来
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = Pick<Todo, "title" | "completed">;

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };

  // Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  interface PageInfo {
    title: string;
  }

  type Page = "home" | "about" | "contact";

  const x: Record<Page, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" },
  };

  // ReturnType 用来得到一个函数的返回值类型
  type ReturnType<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : any;

  type Func = (value: number) => string;
  // ReturnType获取到 Func 的返回值类型为 string，所以，foo 也就只能被赋值为字符串了
  const foo: ReturnType<Func> = "1";

  // Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
  type Exclude<T, U> = T extends U ? never : T;

  // Extract<T, U> 的作用是从 T 中提取出 U。
  type Extract<T, U> = T extends U ? T : never;

  // Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  // NonNullable<T> 的作用是用来过滤类型中的 null 及 undefined 类型。
  type NonNullable<T> = T extends null | undefined ? never : T;

  // Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。
  type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
  ) => any
    ? P
    : never;
  type A = Parameters<() => void>; // []
  type B = Parameters<typeof Array.isArray>; // [any]
  type C = Parameters<typeof parseInt>; // [string, (number | undefined)?]
  type D = Parameters<typeof Math.max>; // number[]
}
