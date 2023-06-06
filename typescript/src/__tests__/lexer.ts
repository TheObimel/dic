import { Lexer } from "../lexer";
import { Token, TokenTypes } from "../token";

test("nextToken baby steps", function() {
    const input = `=+(){},;`

    const results: Token[] = [
        {type: TokenTypes.ASSIGN, literal: "="},
        {type: TokenTypes.PLUS, literal: "+"},
        {type: TokenTypes.LPAREN, literal: "("},
        {type: TokenTypes.RPAREN, literal: ")"},
        {type: TokenTypes.LBRACE, literal: "{"},
        {type: TokenTypes.RBRACE, literal: "}"},
        {type: TokenTypes.COMMA, literal: ","},
        {type: TokenTypes.SEMICOLON, literal: ";"},
        {type: TokenTypes.EOF, literal: ""},
    ];

    const lexer = new Lexer(input);

    for(let token of results){
        expect(lexer.nextToken()).toEqual(token);
    }
});

test("nextToken ended", function() {
    // Small difference :
    //  Double whitespace check is needed now
    const input = `let  five = 5;
    let ten = 10;

    let add = fn(x, y) {
        x + y;
    };

    let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
	return true;
} else {
	return false;
}

10 == 10;
10 != 9;
`;

    const expected: Token[] = [
		{ type: TokenTypes.LET, literal: "let"},
		{ type: TokenTypes.IDENT, literal: "five"},
		{ type: TokenTypes.ASSIGN, literal: "="},
		{ type: TokenTypes.INT, literal: "5"},
		{ type: TokenTypes.SEMICOLON, literal: ";"},
		{ type: TokenTypes.LET, literal: "let"},
		{ type: TokenTypes.IDENT, literal: "ten"},
		{ type: TokenTypes.ASSIGN, literal: "="},
		{ type: TokenTypes.INT, literal: "10"},
		{ type: TokenTypes.SEMICOLON, literal: ";"},
		{ type: TokenTypes.LET, literal: "let"},
		{ type: TokenTypes.IDENT, literal: "add"},
		{ type: TokenTypes.ASSIGN, literal: "="},
		{ type: TokenTypes.FUNCTION, literal: "fn"},
		{ type: TokenTypes.LPAREN, literal: "("},
		{ type: TokenTypes.IDENT, literal: "x"},
		{ type: TokenTypes.COMMA, literal: ","},
		{ type: TokenTypes.IDENT, literal: "y"},
		{ type: TokenTypes.RPAREN, literal: ")"},
		{ type: TokenTypes.LBRACE, literal: "{"},
		{ type: TokenTypes.IDENT, literal: "x"},
		{ type: TokenTypes.PLUS, literal: "+"},
		{ type: TokenTypes.IDENT, literal: "y"},
		{ type: TokenTypes.SEMICOLON, literal: ";"},
		{ type: TokenTypes.RBRACE, literal: "}"},
		{ type: TokenTypes.SEMICOLON, literal: ";"},
		{ type: TokenTypes.LET, literal: "let"},
		{ type: TokenTypes.IDENT, literal: "result"},
		{ type: TokenTypes.ASSIGN, literal: "="},
		{ type: TokenTypes.IDENT, literal: "add"},
		{ type: TokenTypes.LPAREN, literal: "("},
		{ type: TokenTypes.IDENT, literal: "five"},
		{ type: TokenTypes.COMMA, literal: ","},
		{ type: TokenTypes.IDENT, literal: "ten"},
		{ type: TokenTypes.RPAREN, literal: ")"},
		{ type: TokenTypes.SEMICOLON, literal: ";"},
		{ type: TokenTypes.BANG, literal:  "!" },
		{ type: TokenTypes.MINUS, literal:  "-" },
		{ type: TokenTypes.SLASH, literal:  "/" },
		{ type: TokenTypes.ASTERISK, literal:  "*" },
		{ type: TokenTypes.INT, literal:  "5" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.INT, literal:  "5" },
		{ type: TokenTypes.LT, literal:  "<" },
		{ type: TokenTypes.INT, literal:  "10" },
		{ type: TokenTypes.GT, literal:  ">" },
		{ type: TokenTypes.INT, literal:  "5" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.IF, literal:  "if" },
		{ type: TokenTypes.LPAREN, literal:  "(" },
		{ type: TokenTypes.INT, literal:  "5" },
		{ type: TokenTypes.LT, literal:  "<" },
		{ type: TokenTypes.INT, literal:  "10" },
		{ type: TokenTypes.RPAREN, literal:  ")" },
		{ type: TokenTypes.LBRACE, literal:  "{" },
		{ type: TokenTypes.RETURN, literal:  "return" },
		{ type: TokenTypes.TRUE, literal:  "true" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.RBRACE, literal:  "}" },
		{ type: TokenTypes.ELSE, literal:  "else" },
		{ type: TokenTypes.LBRACE, literal:  "{" },
		{ type: TokenTypes.RETURN, literal:  "return" },
		{ type: TokenTypes.FALSE, literal:  "false" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.RBRACE, literal:  "}" },
		{ type: TokenTypes.INT, literal:  "10" },
		{ type: TokenTypes.EQ, literal:  "==" },
		{ type: TokenTypes.INT, literal:  "10" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.INT, literal:  "10" },
		{ type: TokenTypes.NOT_EQ, literal:  "!=" },
		{ type: TokenTypes.INT, literal:  "9" },
		{ type: TokenTypes.SEMICOLON, literal:  ";" },
		{ type: TokenTypes.EOF, literal:  "" },
	];

    const lexer = new Lexer(input);
    for(let token of expected) {
        expect(lexer.nextToken()).toEqual(token);
    }
});
