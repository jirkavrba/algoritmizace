import "./wasm_exec.js";
import { readFile } from "fs/promises";

const go = new Go();
const data   = await readFile("./main.wasm");
const result = await WebAssembly.instantiate(data, go.importObject);

go.run(result.instance);

console.log(isPalindrome("Anna")); // true
console.log(isPalindrome("Jelenovi pivo nelej!")); // true
console.log(isPalindrome("Nepochopen")); // true
console.log(isPalindrome("Tohle není palindrom")); // false
console.log(isPalindrome("Milá památka. Malovaný sešit, den hyne, partu mámí tiše řeka, taj, mat nemám. Dán si své víno vypil, nesl chrpu, mák. Je den hájů, keř, péče, mé díly, hůl. Pán nemá kuráž, máti volám co nemám rád. I lovec musí lhát. Je lov, má klec i lev. I ten dále já masák nalézám u dubu. Taj? Málo v lese, vílo, do podolí vesel volám: Já tu budu. Má zelánka sama je. Lad? Neti, velice lkám. Volej: Táhli sumce voli, dar. Máme noc. Málo vítám žár u kamen. Na pluhy, lide, meče překuj, a hned! Ej, kam uprchl sen? Lípy voní ve vsi. Snad mámen tam já také řešiti mám utrápený hned. Tiše syna volám: Akta má pálím."));
