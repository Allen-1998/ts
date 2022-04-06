// 第一题 以上代码为什么会提示错误，应该如何解决上述问题？
{
  type User = {
    id: number;
    kind: string;
  };

  // function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  function makeCustomer<T extends User>(u: T): User {
    return {
      id: u.id,
      kind: "customer",
    };
  }
}

// 第二题 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
{
  function f(a: number, b: number): number;
  function f(a: string, b: string): string;
  function f(a: string | number, b: string | number) {
    if (typeof a === "string" || typeof b === "string") {
      return a + ":" + b; // no error but b can be number!
    } else {
      // return a + b; // error as b can be number | stringreturn a + +b // error as b can be number | string
      return a + +b; // error as b can be number | string
    }
  }

  // function f<T extends string | number>(a: T, b: T) {
  //   if (typeof a === 'string') {
  //     return a + ':' + b; // no error but b can be number!
  //   } else {
  //     return (a as number) + (b as number); // error as b can be number | string
  //   }
  // }

  f(2, 3); // Ok
  // f(1, "a"); // Error
  // f("a", 2); // Error
  f("a", "b"); // Ok
}

// 第三题 那么如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？
{
  type Foo = {
    a: number;
    b?: string;
    c: boolean;
  };

  // 测试用例
  type SomeOptional = SetOptionalOmit<Foo, "a" | "b">;
  // type SomeOptional = {
  // 	a?: number; // 该属性已变成可选的
  // 	b?: string; // 保持不变
  // 	c: boolean;
  // }
  type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  type SetOptionalOmit<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

  // 实现 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的
  type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  type SetRequiredOmit<T, K extends keyof T> = Pick<T, K> &
    Required<Omit<T, K>>;
}

// 第四题 定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型
{
  interface Example {
    a: string;
    b: string | number;
    c: () => void;
    d: {};
  }

  // 测试用例：
  type StringKeysOnly = ConditionalPick<Example, string>;
  //=> {a: string}
  type ConditionalPick<T, K> = {
    [P in keyof T as T[P] extends K ? P : never]: T[P];
  };
}

// 第五题 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数
{
  type Fn = (a: number, b: string) => number;

  type FinalFn = AppendArgument<Fn, boolean>;
  // (x: boolean, a: number, b: string) => number
  type AppendArgument<F extends (...args: any) => any, A> = (
    x: A,
    ...args: Parameters<F>
  ) => ReturnType<F>;
}

// 第六题 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）
{
  type NaiveFlat<T extends any[]> = T[number][number];

  // 测试用例：
  type NaiveResult = NaiveFlat<[["a"], ["b", "c"], ["d"]]>;
  // NaiveResult的结果： "a" | "b" | "c" | "d"

  // 继续实现 DeepFlat 工具类型，以支持多维数组类型：
  type DeepFlat<T extends any[]> = T extends any[] ? DeepFlat<T[number]> : T;

  // 测试用例
  type Deep = [["a"], ["b", "c"], [["d"]], [[[["e"]]]]];
  type DeepTestResult = DeepFlat<Deep>;
  // DeepTestResult: "a" | "b" | "c" | "d" | "e"
}
