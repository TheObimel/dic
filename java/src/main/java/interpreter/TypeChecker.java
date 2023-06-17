package interpreter;

public class TypeChecker {

    public static boolean isLetter(char ch) {
        if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch == '_') {
            return true;
        }
        return false;
    }

    public static boolean isDigit(char ch) {
        if (ch >= '0' && ch <= '9') {
            return true;
        }
        return false;
    }

}
