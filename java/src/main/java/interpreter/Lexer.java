package interpreter;

import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

public class Lexer {
    private String input;
    private int position;
    private int nextPos;
    private char ch;
    private static final Map<String, Token> keywords;
    static {
        Map<String, Token> map = new HashMap<String, Token>();
        map.put(Token.LET.getLiteral(), Token.LET);
        map.put(Token.FUNCTION.getLiteral(), Token.FUNCTION);
        map.put(Token.IF.getLiteral(), Token.IF);
        map.put(Token.ELSE.getLiteral(), Token.ELSE);
        map.put(Token.TRUE.getLiteral(), Token.TRUE);
        map.put(Token.FALSE.getLiteral(), Token.FALSE);
        map.put(Token.RETURN.getLiteral(), Token.RETURN);
        keywords = Collections.unmodifiableMap(map);
    }

    public Lexer(String input) {
        this.input = input;
        this.position = 0;
        this.nextPos = getNextPos();
        this.ch = getChar();
    }

    public Token nextToken() {
        skipWhiteSpace();

        Token tok;

        switch (this.ch) {
            case '=':
                if (peek() == '=') {
                    tok = Token.EQ;
                    readChar();
                    readChar();
                    return tok;
                }
                tok = Token.ASSIGN;
                break;
            case '!':
                if (peek() == '=') {
                    tok = Token.NOT_EQ;
                    readChar();
                    readChar();
                    return tok;
                }
                tok = Token.BANG;
                break;
            case ';':
                tok = Token.SEMICOLON;
                break;
            case '(':
                tok = Token.LPAREN;
                break;
            case ')':
                tok = Token.RPAREN;
                break;
            case ',':
                tok = Token.COMMA;
                break;
            case '+':
                tok = Token.PLUS;
                break;
            case '-':
                tok = Token.MINUS;
                break;
            case '/':
                tok = Token.SLASH;
                break;
            case '<':
                tok = Token.LT;
                break;
            case '>':
                tok = Token.GT;
                break;
            case '*':
                tok = Token.ASTERISK;
                break;
            case '{':
                tok = Token.LBRACE;
                break;
            case '}':
                tok = Token.RBRACE;
                break;
            case '\0':
                tok = Token.EOF;
                break;
            default:
                if (TypeChecker.isLetter(this.ch)) {
                    String ident = readIdentifier();
                    Token keywordToken = keywords.get(ident);

                    if (keywordToken == null) {
                        tok = Token.IDENT.literal(ident);
                    } else {
                        tok = keywordToken;
                    }
                    return tok;
                }

                if (TypeChecker.isDigit(this.ch)) {
                    String number = readNumber();
                    return Token.INT.literal(number);
                }

                tok = Token.ILLEGAL;
        }

        this.readChar();
        return tok;
    }

    private char getChar() {
        return input.charAt(position);
    }

    private int getNextPos() {
        return position + 1;
    }

    private char peek() {
        return input.charAt(nextPos);
    }

    private void readChar() {
        this.position = nextPos;
        this.nextPos = getNextPos();

        if (position >= input.length()) {
            this.ch = '\0';
        } else {
            this.ch = getChar();
        }
    }

    private String readIdentifier() {
        int start = this.position;

        while (TypeChecker.isLetter(this.ch)) {
            readChar();
        }

        return input.substring(start, this.position);
    }

    private String readNumber() {
        int start = this.position;

        while (TypeChecker.isDigit(this.ch)) {
            readChar();
        }

        return input.substring(start, this.position);
    }

    private void skipWhiteSpace() {
        if (this.ch == ' ' || this.ch == '\t' || this.ch == '\r' || this.ch == '\n') {
            readChar();
            skipWhiteSpace();
        }
    }
}
