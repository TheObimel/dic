import { Lexer } from "../lexer";
import { Token, tokenTypes } from "../token";

test("nextToken baby steps", function() {
    const input = `=+(){},;`

    const results: Token[] = [
        {type: tokenTypes.ASSIGN, literal: "="},
        {type: tokenTypes.PLUS, literal: "+"},
        {type: tokenTypes.LPAREN, literal: "("},
        {type: tokenTypes.RPAREN, literal: ")"},
        {type: tokenTypes.LBRACE, literal: "{"},
        {type: tokenTypes.RBRACE, literal: "}"},
        {type: tokenTypes.COMMA, literal: ","},
        {type: tokenTypes.SEMICOLON, literal: ";"},
        {type: tokenTypes.EOF, literal: ""},
    ];

    const lexer = new Lexer(input);

    for(let token of results){
        expect(lexer.nextToken()).toEqual(token);
    }
});

test("nextToken ended", function() {
    const input = `
    let five = 5;
    let ten = 10;
    let add = fn(x, y) {
        x + y;
    };
    let result = add(five, ten);
    `
    const tests: Token[] = [
		{type: tokenTypes.LET, literal: "let"},
		{type: tokenTypes.IDENT, literal: "five"},
		{type: tokenTypes.ASSIGN, literal: "="},
		{type: tokenTypes.INT, literal: "5"},
		{type: tokenTypes.SEMICOLON, literal: ";"},
		{type: tokenTypes.LET, literal: "let"},
		{type: tokenTypes.IDENT, literal: "ten"},
		{type: tokenTypes.ASSIGN, literal: "="},
		{type: tokenTypes.INT, literal: "10"},
		{type: tokenTypes.SEMICOLON, literal: ";"},
		{type: tokenTypes.LET, literal: "let"},
		{type: tokenTypes.IDENT, literal: "add"},
		{type: tokenTypes.ASSIGN, literal: "="},
		{type: tokenTypes.FUNCTION, literal: "fn"},
		{type: tokenTypes.LPAREN, literal: "("},
		{type: tokenTypes.IDENT, literal: "x"},
		{type: tokenTypes.COMMA, literal: ","},
		{type: tokenTypes.IDENT, literal: "y"},
		{type: tokenTypes.RPAREN, literal: ")"},
		{type: tokenTypes.LBRACE, literal: "{"},
		{type: tokenTypes.IDENT, literal: "x"},
		{type: tokenTypes.PLUS, literal: "+"},
		{type: tokenTypes.IDENT, literal: "y"},
		{type: tokenTypes.SEMICOLON, literal: ";"},
		{type: tokenTypes.RBRACE, literal: "}"},
		{type: tokenTypes.SEMICOLON, literal: ";"},
		{type: tokenTypes.LET, literal: "let"},
		{type: tokenTypes.IDENT, literal: "result"},
		{type: tokenTypes.ASSIGN, literal: "="},
		{type: tokenTypes.IDENT, literal: "add"},
		{type: tokenTypes.LPAREN, literal: "("},
		{type: tokenTypes.IDENT, literal: "five"},
		{type: tokenTypes.COMMA, literal: ","},
		{type: tokenTypes.IDENT, literal: "ten"},
		{type: tokenTypes.RPAREN, literal: ")"},
		{type: tokenTypes.SEMICOLON, literal: ";"},
		{type: tokenTypes.EOF, literal: ""},
	];

    const lexer = new Lexer(input);
    for(let token of tests) {
        expect(lexer.nextToken()).toEqual(token);
    }
});
