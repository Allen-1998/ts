// 第八题 定义 NonEmptyArray 工具类型，用于确保数据非空数组。
{
  type NonEmptyArray<T> = [T, ...T[]];

  // const a: NonEmptyArray<string> = []; // 将出现编译错误
  const b: NonEmptyArray<string> = ["Hello TS"]; // 非空数据，正常使用
}

// 第九题 定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接。
{
  // TODO 有点菜暂时看不懂，以后再研究
  type JoinStrArray<
    Arr extends string[],
    Separator extends string,
    Result extends string = ""
  > = Arr extends [infer El, ...infer Rest]
    ? Rest extends string[]
      ? El extends string
        ? Result extends ""
          ? JoinStrArray<Rest, Separator, `${El}`>
          : JoinStrArray<Rest, Separator, `${Result}${Separator}${El}`>
        : `${Result}`
      : `${Result}`
    : `${Result}`;

  // 测试用例
  type Names = ["Sem", "Lolo", "Kaquko"];
  type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
  type NamesSpace = JoinStrArray<Names, " ">; // "Sem Lolo Kaquko"
  type NamesStars = JoinStrArray<Names, "⭐️">; // "Sem⭐️Lolo⭐️Kaquko"
}

// 第十题 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理。
{
  type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
  type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

  type Trim<V extends string> = TrimLeft<TrimRight<V>>;
  // 测试用例
  type test = Trim<" semlinker ">;
  //=> 'semlinker'
}

// 第十一题 实现一个 IsEqual 工具类型，用于比较两个类型是否相等。
{
  // 此题需要考虑联合类型以及never的问题，因此用 [] 将联合类型处理一下，避免分发处理。
  type IsEqual<A, B> = [A] extends [B]
    ? [B] extends [A]
      ? true
      : false
    : false;
  // 测试用例
  type E0 = IsEqual<1, 2>; // false
  type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
  type E2 = IsEqual<[1], []>; // false
  type E3 = IsEqual<[], [1]>; // false
  type E4 = IsEqual<never, never>; // true
}

// 第十二题 实现一个 Head 工具类型，用于获取数组类型的第一个类型。
{
  type Head<T extends Array<any>> = T extends [] ? never : T[0];
  // type Head<T extends any[]> = T["length"] extends 0 ? never : T[0];

  // 测试用例
  type H0 = Head<[]>; // never
  type H1 = Head<[1]>; // 1
  type H2 = Head<[3, 2]>; // 3
}

// 第十三题 实现一个 Tail 工具类型，用于获取数组类型除了第一个类型外，剩余的类型。
{
  type Tail<T extends Array<any>> = T extends [infer A, ...infer B] ? B : [];

  // 测试用例
  type T0 = Tail<[]>; // []
  type T1 = Tail<[1, 2]>; // [2]
  type T2 = Tail<[1, 2, 3, 4, 5]>; // [2, 3, 4, 5]
}

// 第十四题 实现一个 Unshift 工具类型，用于把指定类型 E 作为第一个元素添加到 T 数组类型中。
{
  type Unshift<T extends any[], E> = [E, ...T];

  // 测试用例
  type Arr0 = Unshift<[], 1>; // [1]
  type Arr1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]
}

// 第十五题 实现一个 Shift 工具类型，用于移除 T 数组类型中的第一个类型。
{
  // 与十三题重复
  type Shift<T extends Array<any>> = T extends [infer A, ...infer B] ? B : [];

  // 测试用例
  type S0 = Shift<[1, 2, 3]>; // [2, 3]
  type S1 = Shift<[string, number, boolean]>; // [number,boolean]
}

// 第十六题 实现一个 Push 工具类型，用于把指定类型 E 作为最后一个元素添加到 T 数组类型中。
{
  type Push<T extends any[], V> = [...T, V];

  // 测试用例
  type Arr0 = Push<[], 1>; // [1]
  type Arr1 = Push<[1, 2, 3], 4>; // [1, 2, 3, 4]
}

// 第十七题 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中。
{
  type Includes<T extends Array<any>, E> = E extends T[number] ? true : false;

  type I0 = Includes<[], 1>; // false
  type I1 = Includes<[2, 2, 3, 1], 2>; // true
  type I2 = Includes<[2, 3, 3, 1], 1>; // true
  type I3 = Includes<[2, 3, 3, "4"], "4">; // true
}

// 第十八题 实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型。
{
  // TODO 有点菜暂时看不懂，以后再研究
  type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  // 测试用例
  type U0 = UnionToIntersection<string | number>; // never
  type U1 = UnionToIntersection<{ name: string } | { age: number }>; // { name: string; } & { age: number; }
}

// 第十九题 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性。
{
  type Person = {
    id: string;
    name: string;
    age: number;
    from?: string;
    speak?: string;
  };

  type OptionalKeys<T> = NonNullable<
    {
      [P in keyof T]: undefined extends T[P] ? P : never;
    }[keyof T]
  >;

  type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"
}

// 第二十题 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理。
{
  type Curry<
    F extends (...args: any[]) => any,
    P extends any[] = Parameters<F>,
    R = ReturnType<F>
  > = P extends [infer A, infer B, ...infer C]
    ? (arg: A) => Curry<(...args: [B, ...C]) => R>
    : F;

  type F0 = Curry<() => Date>; // () => Date
  type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
  type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
}
