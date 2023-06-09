import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { Lexer } from "./lexer";
import { Token, TokenTypes } from "./token";

async function start(){
    const rl = readline.createInterface({ input, output, prompt: ">> " });
    rl.prompt();
    rl.on('line', (line) => {
        const lexer = new Lexer(line);
        let token: Token | undefined;

        while(token?.type !== TokenTypes.EOF) {
            token = lexer.nextToken();
            console.log(token);
        }

        rl.prompt();
    });
}

start();
