import { checkParentheses } from "./pkg/parentheses.js";

checkParentheses("()"); // true
checkParentheses("("); // false
checkParentheses("()))"); // false
checkParentheses("()(()"); // false
checkParentheses("()(())"); // true