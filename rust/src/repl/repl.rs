use crate::lexer::lexer::Lexer;
use crate::lexer::token::Token;
use std::io::stdin;

pub fn start() {
    stdin().lines().for_each(|line| {
        if let Ok(line) = line {
            let mut lexer = Lexer::new(line);

            loop {
                let tok = lexer.next_token();
                if tok == Token::Eof {
                    break;
                }

                println!("{} ", tok);
                //println!("Token: {},", tok);
            }
        }
    });
}
