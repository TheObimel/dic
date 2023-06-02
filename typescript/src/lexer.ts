import { Token, createToken, TokenTypes} from "./token";

function isLetter(char: string): boolean {
    return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char === '_';
}

export class Lexer {
    private currPos: number;
    private nextPos: number;
    private char: string;

    constructor(private input: string) {
        this.currPos = 0;
        this.nextPos = 1;
        this.char = this.input[0];
    }

    nextToken(): Token {
        const token = this.tokenizer();
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

    private tokenizer(): Token {
        this.skipWhiteSpace();

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
                    token = this.readIdentifier();
                } else {
                    //ILLEGAL
                    token = createToken(TokenTypes.ILLEGAL, this.char);
                }
        };

        return token;
    }

    //TODO:
    private readIdentifier(): Token {
        return createToken(TokenTypes.LET, '');
    }

    private skipWhiteSpace(): void {
        if(this.char === ' ' || this.char === '\t' || this.char === '\r' || this.char === '\n') {
            this.readChar();
        }
    }
}
