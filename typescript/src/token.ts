export const TokenTypes = {
    ILLEGAL: "ILLEGAL",
    EOF: "EOF",
    // Identifiers + literals
    IDENT: "IDENT",
    INT: "INT",
    // Operators
    ASSIGN: "=",
    PLUS: "+",
	MINUS: "-",
	ASTERISK: "*",
	SLASH: "/",
	BANG: "!",
	LT: "<",
	GT: ">",
    EQ: "==",
    NOT_EQ: "!=",
    // Delimiters
    COMMA: ",",
    SEMICOLON: ";",
    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",
    // Keywords
    FUNCTION: "FUNCTION",
    LET: "LET",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN",
    TRUE: "TRUE",
    FALSE: "FALSE",
} as const;

export type TokenType = typeof TokenTypes[keyof typeof TokenTypes];

export type Token = {
    type: TokenType,
    literal: string
}

export function createToken(type: TokenType, literal: string): Token {
    return { type, literal };
}
