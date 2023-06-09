use super::token::Token;

pub struct Lexer {
    position: usize,
    next_position: usize,
    ch: u8,
    input: Vec<u8>,
}

impl Lexer {
    pub fn new(input: String) -> Lexer {
        let input = input.into_bytes();

        Lexer {
            position: 0,
            next_position: 1,
            ch: input[0],
            input,
        }
    }

    pub fn next_token(&mut self) -> Token {
        self.skip_whitespaces();

        let token = match self.ch {
            b'(' => Token::Lparen,
            b')' => Token::Rparen,
            b'{' => Token::Lbrace,
            b'}' => Token::Rbrace,
            b'=' => {
                if self.peek() == b'=' {
                    self.read_char();
                    Token::Eq
                } else {
                    Token::Assign
                }
            }
            b'!' => {
                if self.peek() == b'=' {
                    self.read_char();
                    Token::NotEq
                } else {
                    Token::Bang
                }
            }
            b'+' => Token::Plus,
            b'-' => Token::Minus,
            b'*' => Token::Asterisk,
            b'/' => Token::Slash,
            b'>' => Token::Gt,
            b'<' => Token::Lt,
            b',' => Token::Comma,
            b';' => Token::Semicolon,
            //isLetter
            b'a'..=b'z' | b'A'..=b'Z' | b'_' => {
                let ident = self.read_identifier();
                //lookupIdent
                return match ident.as_str() {
                    "let" => Token::Let,
                    "fn" => Token::Function,
                    "if" => Token::If,
                    "else" => Token::Else,
                    "return" => Token::Return,
                    "true" => Token::True,
                    "false" => Token::False,
                    _ => Token::Ident(ident),
                };
            }
            b'0'..=b'9' => return Token::Int(self.read_int()),
            0 => Token::Eof,
            _ => Token::Illegal,
        };

        self.read_char();
        return token;
    }

    fn peek(&self) -> u8 {
        if self.next_position >= self.input.len() {
            return 0;
        } else {
            return self.input[self.next_position];
        }
    }

    fn read_char(&mut self) {
        if self.next_position >= self.input.len() {
            self.ch = 0;
        } else {
            self.ch = self.input[self.next_position];
        }
        self.position = self.next_position;
        self.next_position += 1;
    }

    fn read_identifier(&mut self) -> String {
        let start_pos = self.position;

        while self.ch.is_ascii_alphabetic() || self.ch == b'_' {
            self.read_char();
        }

        return String::from_utf8_lossy(&self.input[start_pos..self.position]).to_string();
    }

    fn read_int(&mut self) -> String {
        let start_pos = self.position;

        while self.ch.is_ascii_digit() {
            self.read_char()
        }

        return String::from_utf8_lossy(&self.input[start_pos..self.position]).to_string();
    }

    fn skip_whitespaces(&mut self) {
        while self.ch.is_ascii_whitespace() {
            self.read_char();
        }
    }
}

#[cfg(test)]
mod tests {

    use super::Lexer;
    use super::Token;

    #[test]
    fn next_token() {
        let input = String::from("=+(){},;");
        let expected = vec![
            Token::Assign,
            Token::Plus,
            Token::Lparen,
            Token::Rparen,
            Token::Lbrace,
            Token::Rbrace,
            Token::Comma,
            Token::Semicolon,
            Token::Eof,
        ];
        let mut lexer = Lexer::new(input);

        for token in expected {
            let tok = lexer.next_token();

            println!("expected: {}, received: {:?}", token, tok);
            assert_eq!(token, tok);
        }
    }

    #[test]
    fn next_token_advanced() {
        let input = String::from(
            "let   five = 5;
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
        ",
        );

        let expected = vec![
            { Token::Let },
            { Token::Ident("five".to_string()) },
            { Token::Assign },
            { Token::Int("5".to_string()) },
            { Token::Semicolon },
            { Token::Let },
            { Token::Ident("ten".to_string()) },
            { Token::Assign },
            { Token::Int("10".to_string()) },
            { Token::Semicolon },
            { Token::Let },
            { Token::Ident("add".to_string()) },
            { Token::Assign },
            { Token::Function },
            { Token::Lparen },
            { Token::Ident("x".to_string()) },
            { Token::Comma },
            { Token::Ident("y".to_string()) },
            { Token::Rparen },
            { Token::Lbrace },
            { Token::Ident("x".to_string()) },
            { Token::Plus },
            { Token::Ident("y".to_string()) },
            { Token::Semicolon },
            { Token::Rbrace },
            { Token::Semicolon },
            { Token::Let },
            { Token::Ident("result".to_string()) },
            { Token::Assign },
            { Token::Ident("add".to_string()) },
            { Token::Lparen },
            { Token::Ident("five".to_string()) },
            { Token::Comma },
            { Token::Ident("ten".to_string()) },
            { Token::Rparen },
            { Token::Semicolon },
            { Token::Bang },
            { Token::Minus },
            { Token::Slash },
            { Token::Asterisk },
            { Token::Int("5".to_string()) },
            { Token::Semicolon },
            { Token::Int("5".to_string()) },
            { Token::Lt },
            { Token::Int("10".to_string()) },
            { Token::Gt },
            { Token::Int("5".to_string()) },
            { Token::Semicolon },
            { Token::If },
            { Token::Lparen },
            { Token::Int("5".to_string()) },
            { Token::Lt },
            { Token::Int("10".to_string()) },
            { Token::Rparen },
            { Token::Lbrace },
            { Token::Return },
            { Token::True },
            { Token::Semicolon },
            { Token::Rbrace },
            { Token::Else },
            { Token::Lbrace },
            { Token::Return },
            { Token::False },
            { Token::Semicolon },
            { Token::Rbrace },
            { Token::Int("10".to_string()) },
            { Token::Eq },
            { Token::Int("10".to_string()) },
            { Token::Semicolon },
            { Token::Int("10".to_string()) },
            { Token::NotEq },
            { Token::Int("9".to_string()) },
            { Token::Semicolon },
            { Token::Eof },
        ];

        let mut lexer = Lexer::new(input);

        for token in expected {
            let tok = lexer.next_token();
            assert_eq!(token, tok, "expected: {}, received: {:?}", token, tok);
        }
    }
}
