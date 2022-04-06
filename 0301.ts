// 第二十一题 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys。
{
  type Foo = {
    a: number;
    b: string;
  };

  type Bar = {
    b: number;
  };

  type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> &
    SecondType;

  const ab: Merge<Foo, Bar> = { a: 1, b: 2 };
}

// 第二十二题 实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样。
{
  type Responder = {
    text?: () => string;
    json?: () => string;
    secure?: boolean;
  };

  type RequireAtLeastOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
  > = Omit<ObjectType, KeysType> &
    {
      [k in KeysType]: Required<Pick<ObjectType, k>>;
    }[KeysType];

  // 表示当前类型至少包含 'text' 或 'json' 键
  const responder: RequireAtLeastOne<Responder, "text" | "json"> = {
    json: () => '{"message": "ok"}',
    secure: true,
  };
}

// 第二十三题 实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名。
{
  interface Foo {
    [key: string]: any;
    [key: number]: any;
    bar(): void;
  }

  type RemoveIndexSignature<T> = {
    [key in keyof T as string extends key
      ? never
      : number extends key
      ? never
      : key]: T[key];
  };

  type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ bar: () => void; }
}

// 第二十四题 实现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符。
{
  type Foo = {
    readonly a: number;
    readonly b: string;
    readonly c: boolean;
  };

  type Mutable<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
    -readonly [P in Keys]: T[P];
  };
  const mutableFoo: Mutable<Foo, "a"> = { a: 1, b: "2", c: true };

  mutableFoo.a = 3; // OK
  // mutableFoo.b = "6"; // Cannot assign to 'b' because it is a read-only property.
}

// 第二十五题 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型。
{
  type IsUnion<T, U = T> = T extends U
    ? [U] extends [T]
      ? false
      : true
    : never;

  type I0 = IsUnion<string | number>; // true
  type I1 = IsUnion<string | never>; // false
  type I2 = IsUnion<string | unknown>; // false
}

// 第二十六题 实现一个 IsNever 工具类型，判断指定的类型是否为 never 类型。
{
  type IsNever<T> = [T] extends [never] ? true : false;

  type I0 = IsNever<never>; // true
  type I1 = IsNever<never | string>; // false
  type I2 = IsNever<null>; // false
}

// 第二十七题 实现一个 Reverse 工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。元组的第一个元素会变成最后一个，最后一个元素变成第一个。
{
  type Reverse<T extends Array<any>, R extends Array<any> = []> = T extends [
    infer A,
    ...infer B
  ]
    ? Reverse<B, [A, ...R]>
    : R;

  type R0 = Reverse<[]>; // []
  type R1 = Reverse<[1, 2, 3]>; // [3, 2, 1]
}

// 第二十八题 实现一个 Split 工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。可用于定义 String.prototype.split 方法的返回值类型。
{
  type Item = "semlinker,lolo,kakuqo";

  type Split<
    S extends string,
    Delimiter extends string
  > = S extends `${infer A}${Delimiter}${infer B}`
    ? [A, ...Split<B, Delimiter>]
    : [S];

  type ElementType = Split<Item, ",">; // ["semlinker", "lolo", "kakuqo"]
}

// 第二十九题 实现一个 ToPath 工具类型，用于把属性访问（. 或 []）路径转换为元组的形式。
{
  type ToPath<S extends string> = removeTuple<
    S extends `${infer A}.${infer B}`
      ? [...ToPath<A>, ...ToPath<B>]
      : S extends `${infer A}[${infer B}]`
      ? [A, B]
      : [S],
    ""
  >;

  // 移除指定类型的元组第一位
  // TODO 进阶版应不在第一位也可以移除
  type removeTuple<T extends Array<any>, V> = T extends [V, ...infer A] ? A : T;

  type a = ToPath<"foo.bar.baz">; //=> ['foo', 'bar', 'baz']
  type b = ToPath<"foo[0].bar.baz">; //=> ['foo', '0', 'bar', 'baz']
  type c = ToPath<"foo[0]">; //=> ['foo', '0']
  type d = ToPath<"foo.bar[0]">; //=> ['foo', 'bar', '0']
  type e = ToPath<"[0].foo.bar[0]">; //=> ['0', 'foo', 'bar', '0']
  type f = ToPath<"">; //=> ['0', 'foo', 'bar', '0']
}

// 第三十题 完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型。
declare const config: Chainable;

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type Chainable<T = {}> = {
  // S extends string can make S is Template Literal Types
  option<V, S extends string>(
    key: S,
    value: V
  ): Chainable<
    T & {
      // use Key Remapping in Mapped Types generate {  S: V } type  https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types
      [P in keyof {
        S: S;
      } as `${S}`]: V;
    }
  >;
  get(): Simplify<T>;
};

const result = config
  .option("age", 7)
  .option("name", "lolo")
  .option("address", { value: "XiaMen" })
  .get();

type ResultType = typeof result;
