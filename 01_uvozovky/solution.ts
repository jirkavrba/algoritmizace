type MaxNesting = 5;

type Increment<
  TCurrent extends number,
  TCounter extends any[] = []
> = TCounter["length"] extends TCurrent
  ? [...TCounter, any]["length"]
  : Increment<TCurrent, [...TCounter, any]>;

type ValidExpansions<
  TBase extends string,
  TLeft extends string,
  TRight extends string
> =
  | `${TLeft}${TBase}${TRight}` // (...)
  | `${TLeft}${TRight}${TBase}` // ()...
  | `${TBase}${TLeft}${TRight}`; // ...()

type Expand<TBase extends string, TPairs extends Record<string, string>> =
  | TBase
  | {
      [TKey in keyof TPairs]: ValidExpansions<
        TBase,
        TKey & string,
        TPairs[TKey]
      >;
    }[keyof TPairs];

type ExpandParentheses<
  TPairs extends Record<string, string>,
  TBase extends string = "",
  TNesting extends number = 0,
  TCombinations extends string = ""
> = TNesting extends MaxNesting
  ? TCombinations
  : ExpandParentheses<
      TPairs,
      Expand<TBase, TPairs>,
      Increment<TNesting>,
      TCombinations | TBase
    >;

const pairs = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
} as const;

type CheckParentheses = ExpandParentheses<typeof pairs>;

const test0: CheckParentheses = "";
const test1: CheckParentheses = "()";
const test2: CheckParentheses = "("; // false
const test3: CheckParentheses = "()))"; // false
const test4: CheckParentheses = "()([)"; // false
const test5: CheckParentheses = "()(())";
const test6: CheckParentheses = "()([])";
const test7: CheckParentheses = "()({])"; // false
