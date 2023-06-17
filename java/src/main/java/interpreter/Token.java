package interpreter;

public enum Token {
    ILLEGAL,
    EOF("eof"),
    // Identifiers + literals
    IDENT,
    INT(""),
    // Operators
    ASSIGN("="),
    EQ("=="),
    NOT_EQ("!="),
    LT("<"),
    GT(">"),
    BANG("!"),
    PLUS("+"),
    MINUS("-"),
    SLASH("/"),
    ASTERISK("*"),
    // Delimiters
    COMMA(","),
    SEMICOLON(";"),
    LPAREN("("),
    RPAREN(")"),
    LBRACE("{"),
    RBRACE("}"),
    // Keywords
    FUNCTION("fn"),
    LET("let"),
    IF("if"),
    ELSE("else"),
    TRUE("true"),
    FALSE("false"),
    RETURN("return");

    private String literal;

    Token(String literal) {
        this.literal = literal;
    }

    Token() {
        this.literal = "";
    }

    Token literal(String literal) {
        this.literal = literal;
        return this;
    }

    String getLiteral() {
        return this.literal;
    }
}
