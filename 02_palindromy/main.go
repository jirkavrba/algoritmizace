//go:build js && wasm

package main

import (
	"regexp"
	"strings"
	"syscall/js"
	"unicode"

	"golang.org/x/text/runes"
	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"
)

func reverse(s string) (result string) {
	for _, v := range s {
		result = string(v) + result
	}

	return
}

func normalize(value string) string {
	var removeUnicode = runes.Remove(runes.In(unicode.Mn))
	var chain = transform.Chain(
		norm.NFD,
		removeUnicode,
		norm.NFC,
	)

	var lowercase = strings.ToLower(value)

	var punctuation = regexp.MustCompile("[.!?,:\\s]")
	var withoutPunctuation = punctuation.ReplaceAllString(lowercase, "")
	var withFixedCh = strings.ReplaceAll(withoutPunctuation, "ch", "_") // Hack to support the czech language properly

	normalized, _, _ := transform.String(chain, withFixedCh)

	return normalized
}

func CheckPalindrome(input string) bool {
	normalized := normalize(input)
	return normalized == reverse(normalized)
}

func checkPalindromeAdapter(this js.Value, args []js.Value) interface{} {
	return CheckPalindrome(args[0].String())
}

func main() {
	js.Global().Set("isPalindrome", js.FuncOf(checkPalindromeAdapter))
	select {}
}
