import { COLORS } from "../Global";
import type { validColor } from "../Global";
import validWords from '../words.json';

const validWordSet = new Set(validWords);

export function checkValid(inputLetters : string[], word : string) : validColor[] {
    let wordCopy : string = word.slice();
    let ans : validColor[] = [1,1,1,1,1];
    
    for(let i = 0; i < 5; i ++) {
        if (inputLetters[i] == wordCopy.charAt(i)) {
            ans[i] = 3; // GREEN
            // remove letter, prevent dupes
            wordCopy = wordCopy.slice(0, i) + "-" + wordCopy.slice(i + 1);
        }
    }

    for(let i = 0; i < 5; i ++) {
        if (ans[i] !== 3) {
            if (wordCopy.includes(inputLetters[i])) {
                ans[i] = 2; // YELLOW
            }
        }
    }

    return ans;
}

export function checkIfWin(inputLetters: string[], wanted : string) : boolean {
    for(let i = 0; i < 5; i++) {
        if (inputLetters[i] !== wanted.charAt(i)) {
            return false
        }
    }
    return true;
}

export function inWordList(inputLetters: string[]) : boolean {
    let guess : string = inputLetters.join('');
    console.log(guess);

    if (validWordSet.has(guess.toLowerCase())) {
        return true;
    }
    return false;
}

export function getRandWord() : string {
    return validWords[Math.floor(Math.random() * validWords.length)];
}