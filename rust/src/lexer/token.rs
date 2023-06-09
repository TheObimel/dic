use std::fmt::{Display, Formatter, Result};

//TODO: Add more Tokens
#[derive(Debug, PartialEq)]
pub enum Token {
    Illegal,
    Eof,

    Ident(String),
    Int(String),

    Assign,
    Eq,
    NotEq,
    Plus,
    Minus,
    Bang,
    Asterisk,
    Slash,
    Lt,
    Gt,

    Comma,
    Semicolon,
    Lparen,
    Rparen,
    Lbrace,
    Rbrace,

    Function,
    Let,
    If,
    Else,
    Return,
    True,
    False,
}

impl Display for Token {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        return match self {
            Token::Ident(str) => write!(f, "{}", str),
            Token::Int(str) => write!(f, "{}", str),
            Token::Illegal => write!(f, ""),
            Token::Eof => write!(f, "Eof"),
            Token::Assign => write!(f, "="),
            Token::Eq => write!(f, "=="),
            Token::NotEq => write!(f, "!="),
            Token::Plus => write!(f, "+"),
            Token::Minus => write!(f, "-"),
            Token::Bang => write!(f, "!"),
            Token::Asterisk => write!(f, "*"),
            Token::Slash => write!(f, "/"),
            Token::Lt => write!(f, "<"),
            Token::Gt => write!(f, ">"),
            Token::Comma => write!(f, ","),
            Token::Semicolon => write!(f, ";"),
            Token::Lparen => write!(f, "("),
            Token::Rparen => write!(f, ")"),
            Token::Lbrace => write!(f, "{{"),
            Token::Rbrace => write!(f, "}}"),
            Token::Function => write!(f, "fn"),
            Token::Let => write!(f, "let"),
            Token::If => write!(f, "if"),
            Token::Else => write!(f, "else"),
            Token::Return => write!(f, "return"),
            Token::True => write!(f, "true"),
            Token::False => write!(f, "false"),
        };
    }
}
