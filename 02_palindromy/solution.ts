type Replace<
    TInput extends string,
    TSearch extends string,
    TReplacement extends string
> = TInput extends `${infer TStart}${TSearch}${infer TEnd}`
    ? `${TStart}${TReplacement}${Replace<TEnd, TSearch, TReplacement>}`
    : TInput;

type ReplaceAll<
    TInput extends string,
    TReplacements extends [string, string][],
> = [] extends TReplacements
    ? TInput
    : (
        TReplacements extends [[infer TSearch extends string, infer TReplacement extends string], ...infer TRest extends [string, string][]]
        ? ReplaceAll<Replace<TInput, TSearch, TReplacement>, TRest>
        : never
    );

type Reversed<TInput extends string> =
    TInput extends `${infer TFirst}${infer TRest}`
    ? `${Reversed<TRest>}${TFirst}`
    : TInput;

// Optimization for compiler performance using array expansion
type Replacements = [
    ["ě", "e"],
    ["š", "s"],
    ["č", "c"],
    ["ř", "r"],
    ["ž", "z"],
    ["ý", "y"],
    ["á", "a"],
    ["í", "i"],
    ["é", "e"],
    ["ú", "u"],
    ["ů", "u"],
    [".", ""],
    ["!", ""],
    ["?", ""],
    [",", ""],
    [" ", ""],
    ["\t", ""],
    ["\n", ""],
    ["ch", "_"], // Hack to support czech language correctly
];

type Normalized<TInput extends string> = ReplaceAll<Lowercase<TInput>, Replacements>;
type CheckPalindrome<T extends string> = Normalized<T> extends Reversed<Normalized<T>> ? any : never;

const test1: CheckPalindrome<"Anna"> = true;
const test2: CheckPalindrome<"Jelenovi pivo nelej!"> = true;
const test3: CheckPalindrome<"Nepochopen"> = true;
const test4: CheckPalindrome<"Tohle není palindrom"> = true;
const test5: CheckPalindrome<"Ne, debyle, doma má má máma modely beden."> = true;
const test6: CheckPalindrome<"Škoda že typescript compiler nedává dlouhý string infers kvůli performance :("> = true;
const test7: CheckPalindrome<"Motal atom."> = true;
const test8: CheckPalindrome<"Motýly, to má motýlý Tom."> = true;