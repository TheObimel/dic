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
    const input = `let  five = 5;
    let ten = 10;

    let add = fn(x, y) {
        x + y;
    };

    let result = add(five, ten);
    `
    const tests: Token[] = [
		{type: TokenTypes.LET, literal: "let"},
		{type: TokenTypes.IDENT, literal: "five"},
		{type: TokenTypes.ASSIGN, literal: "="},
		{type: TokenTypes.INT, literal: "5"},
		{type: TokenTypes.SEMICOLON, literal: ";"},
		{type: TokenTypes.LET, literal: "let"},
		{type: TokenTypes.IDENT, literal: "ten"},
		{type: TokenTypes.ASSIGN, literal: "="},
		{type: TokenTypes.INT, literal: "10"},
		{type: TokenTypes.SEMICOLON, literal: ";"},
		{type: TokenTypes.LET, literal: "let"},
		{type: TokenTypes.IDENT, literal: "add"},
		{type: TokenTypes.ASSIGN, literal: "="},
		{type: TokenTypes.FUNCTION, literal: "fn"},
		{type: TokenTypes.LPAREN, literal: "("},
		{type: TokenTypes.IDENT, literal: "x"},
		{type: TokenTypes.COMMA, literal: ","},
		{type: TokenTypes.IDENT, literal: "y"},
		{type: TokenTypes.RPAREN, literal: ")"},
		{type: TokenTypes.LBRACE, literal: "{"},
		{type: TokenTypes.IDENT, literal: "x"},
		{type: TokenTypes.PLUS, literal: "+"},
		{type: TokenTypes.IDENT, literal: "y"},
		{type: TokenTypes.SEMICOLON, literal: ";"},
		{type: TokenTypes.RBRACE, literal: "}"},
		{type: TokenTypes.SEMICOLON, literal: ";"},
		{type: TokenTypes.LET, literal: "let"},
		{type: TokenTypes.IDENT, literal: "result"},
		{type: TokenTypes.ASSIGN, literal: "="},
		{type: TokenTypes.IDENT, literal: "add"},
		{type: TokenTypes.LPAREN, literal: "("},
		{type: TokenTypes.IDENT, literal: "five"},
		{type: TokenTypes.COMMA, literal: ","},
		{type: TokenTypes.IDENT, literal: "ten"},
		{type: TokenTypes.RPAREN, literal: ")"},
		{type: TokenTypes.SEMICOLON, literal: ";"},
		{type: TokenTypes.EOF, literal: ""},
	];

    const lexer = new Lexer(input);
    for(let token of tests) {
        expect(lexer.nextToken()).toEqual(token);
    }
});
