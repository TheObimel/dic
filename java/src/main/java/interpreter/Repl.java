package interpreter;

import java.io.*;

public class Repl {

    public static void start() throws IOException {
        try {
            Console console = System.console();

            if (console == null) {
                return;
            }

            while (true) {
                String input = console.readLine(">> ");
                Lexer lexer = new Lexer(input);
                Token tok = null;

                while (tok != Token.EOF) {
                    tok = lexer.nextToken();
                    System.out.println(tok);
                    if (tok == Token.EOF) {
                        break;
                    }
                }
            }
        } catch (IOError e) {
            throw new IOError(e);
        }
    }
}
