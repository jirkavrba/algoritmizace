use std::collections::{HashMap, HashSet};

use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = checkParentheses)]
pub fn check_parentheses(input: &str) -> bool {
    let pairs: HashMap<char, char> = HashMap::from([('(', ')'), ('[', ']'), ('{', '}')]);
    let opening: HashSet<char> = pairs.keys().cloned().collect();
    let closing: HashSet<char> = pairs.values().cloned().collect();
    let mut stack = Vec::<char>::new();

    if input.len() == 0 {
        return true;
    }

    let matches = input.chars().fold(true, |so_far_so_good, current| {
        if !so_far_so_good {
            return false;
        }

        if opening.contains(&current) {
            let matching = pairs[&current];
            stack.push(matching);
            return true;
        }

        if closing.contains(&current) {
            return match stack.pop() {
                Some(value) => value == current,
                None => false, // stack is empty, there is an extra closing parentheses
            };
        }

        return false;
    });

    return matches && stack.is_empty();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_check_parentheses() {
        assert_eq!(true, check_parentheses(""));
        assert_eq!(true, check_parentheses("()"));
        assert_eq!(false, check_parentheses("())))"));
        assert_eq!(false, check_parentheses("("));
        assert_eq!(false, check_parentheses("()(()"));
        assert_eq!(true, check_parentheses("()(())"));
        assert_eq!(true, check_parentheses("(){()}"));
        assert_eq!(true, check_parentheses("(){[()]}"));
        assert_eq!(false, check_parentheses("(){[(])}"));
    }
}
