package interpreter;

import org.junit.Test;
//import org.junit.Before;
import static org.junit.Assert.assertEquals;

public class LexerTest {
    private String input;
    private Lexer lexer;

    /*
     * @Before
     * public void setUp() {
     * }
     */

    @Test
    public void nextTokenTest() {
        input = "=+(){},;";
        lexer = new Lexer(input);
        Token[] expected = { Token.ASSIGN, Token.PLUS, Token.LPAREN, Token.RPAREN, Token.LBRACE, Token.RBRACE,
                Token.COMMA, Token.SEMICOLON };

        for (int i = 0; i < expected.length; ++i) {
            Token tok = lexer.nextToken();

            assertEquals("expected: " + expected[i] + " Got: " + tok + "\n\n", expected[i], tok);
        }
    }

    @Test
    public void nextTokenMultiCharacter() {
        input = " let five = 5;\n let ten = 10;\n let add = fn(x, y) {\n x + y;\n };\n let result = add(five, ten);\n !-/*5;\n  5 < 10 > 5;\n if (5 < 10) {\n return true;\n } else {\n return false;\n}\n10 == 10;\n 10 != 9; ";

        lexer = new Lexer(input);
        Token[] expected = {
                Token.LET,
                Token.IDENT.literal("five"),
                Token.ASSIGN,
                Token.INT.literal("5"),
                Token.SEMICOLON,
                Token.LET,
                Token.IDENT.literal("ten"),
                Token.ASSIGN,
                Token.INT.literal("10"),
                Token.SEMICOLON,
                Token.LET,
                Token.IDENT.literal("add"),
                Token.ASSIGN,
                Token.FUNCTION,
                Token.LPAREN,
                Token.IDENT.literal("x"),
                Token.COMMA,
                Token.IDENT.literal("y"),
                Token.RPAREN,
                Token.LBRACE,
                Token.IDENT.literal("x"),
                Token.PLUS,
                Token.IDENT.literal("y"),
                Token.SEMICOLON,
                Token.RBRACE,
                Token.SEMICOLON,
                Token.LET,
                Token.IDENT.literal("result"),
                Token.ASSIGN,
                Token.IDENT.literal("add"),
                Token.LPAREN,
                Token.IDENT.literal("five"),
                Token.COMMA,
                Token.IDENT.literal("ten"),
                Token.RPAREN,
                Token.SEMICOLON,
                Token.BANG,
                Token.MINUS,
                Token.SLASH,
                Token.ASTERISK,
                Token.INT.literal("5"),
                Token.SEMICOLON,
                Token.INT.literal("5"),
                Token.LT,
                Token.INT.literal("10"),
                Token.GT,
                Token.INT.literal("5"),
                Token.SEMICOLON,
                Token.IF,
                Token.LPAREN,
                Token.INT.literal("5"),
                Token.LT,
                Token.INT.literal("10"),
                Token.RPAREN,
                Token.LBRACE,
                Token.RETURN,
                Token.TRUE,
                Token.SEMICOLON,
                Token.RBRACE,
                Token.ELSE,
                Token.LBRACE,
                Token.RETURN,
                Token.FALSE,
                Token.SEMICOLON,
                Token.RBRACE,
                Token.INT.literal("10"),
                Token.EQ,
                Token.INT.literal("10"),
                Token.SEMICOLON,
                Token.INT.literal("10"),
                Token.NOT_EQ,
                Token.INT.literal("9"),
                Token.SEMICOLON,
                Token.EOF,
        };

        for (int i = 0; i < expected.length; ++i) {
            Token tok = lexer.nextToken();

            assertEquals("expected: " + expected[i].getLiteral() + " Got: " + tok.getLiteral() + "\n\n",
                    expected[i].getLiteral(),
                    tok.getLiteral());
        }
    }

}
