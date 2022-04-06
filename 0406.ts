import { Expect, Equal } from "@type-challenges/utils";

{
  // 期望是一个 string 类型
  //   type HelloWorld = any;
  type HelloWorld = string;
  // 你需要使得如下这行不会抛出异常
  type test = Expect<Equal<HelloWorld, string>>;
}

{
  // 实现 Pick
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type TodoPreview = MyPick<Todo, "title" | "completed">;

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };
}

{
  // 实现 Readonly
  interface Todo {
    title: string;
    description: string;
  }
  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
  };
  // @ts-ignore
  todo.title = "Hello"; // Error: cannot reassign a readonly property
  // @ts-ignore
  todo.description = "barFoo"; // Error: cannot reassign a readonly property
}

{
  // 元组转换为对象
  // https://juejin.cn/post/7005376185278414861
  const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
  type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P;
  };
  type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
}
