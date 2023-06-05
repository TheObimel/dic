import { Token, createToken, TokenType, TokenTypes } from "./token";

export class Lexer {
    private currPos: number;
    private nextPos: number;
    private char: string;

    private keywords: ReadonlyMap<string, TokenType> = new Map([
        ["fn", TokenTypes.FUNCTION],
        ["let", TokenTypes.LET],
    ]);

    constructor(private input: string) {
        this.currPos = 0;
        this.nextPos = 1;
        this.char = this.input[0];
    }

    nextToken(): Token {
        this.skipWhitespace();

        //Tokenizer
        let token: Token;
        switch (this.char) {
            case '=' :
                token = createToken(TokenTypes.ASSIGN, this.char);
            break;
            case ';':
                token = createToken(TokenTypes.SEMICOLON, this.char);
            break;
            case '(':
                   token = createToken(TokenTypes.LPAREN, this.char);
            break;
            case ')':
                   token = createToken(TokenTypes.RPAREN, this.char);
            break;
            case ',':
                token = createToken(TokenTypes.COMMA, this.char);
            break;
            case '+':
                token = createToken(TokenTypes.PLUS, this.char);
            break;
            case '{':
                token = createToken(TokenTypes.LBRACE, this.char);
            break;
            case '}':
                token = createToken(TokenTypes.RBRACE, this.char);
            break;
            case '\0':
                token = createToken(TokenTypes.EOF, '');
            break;
            default:
                if(isLetter(this.char)) {
                    const ident = this.readIdentifier();
                    token = createToken(this.lookupKeywords(ident), ident);

                    return token;
                }

                if(isNumber(this.char)) {
                    const numb = this.readNumber();
                    token = createToken(TokenTypes.INT, numb);

                    return token;
                }
                token = createToken(TokenTypes.ILLEGAL, this.char);
        };

        this.readChar();

        return token;
    }

    private readChar() {
        if(this.nextPos >= this.input.length) {
            this.char = '\0';
        } else {
            this.char = this.input[this.nextPos];
        }
        this.currPos = this.nextPos;
        this.nextPos++;
    }

    private iterate(condition: (char: string) => boolean) {
        const startPos = this.currPos;

        while(condition(this.char)) {
            this.readChar();
        }

        return this.input.substring(startPos, this.currPos);
    }

    private readIdentifier(): string {
        return this.iterate(isLetter);
    }

    //NOTE: Ignoring float numbers
    private readNumber(): string {
        return this.iterate(isNumber);
    }

    private lookupKeywords(identifier: string): TokenType {
          const keyword = this.keywords.get(identifier);
          return keyword ? keyword : TokenTypes.IDENT;
    }

    private skipWhitespace(): void {
        if(this.char === ' ' || this.char === '\t' || this.char === '\r' || this.char === '\n') {
            this.readChar();
            this.skipWhitespace();
        }
    }
}

function isLetter(char: string): boolean {
    return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char === '_';
}

function isNumber(char: string): boolean {
    return char >= '0' && char <= '9';
}
