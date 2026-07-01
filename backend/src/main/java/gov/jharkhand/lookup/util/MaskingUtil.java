package gov.jharkhand.lookup.util;

public class MaskingUtil {

    public static String maskMobile(String mobile) {
        if (mobile == null || mobile.length() < 4) {
            return mobile;
        }
        return mobile.replaceAll(".(?=.{4,})", "*");
    }

    public static String maskAccountNumber(String accountNo) {
        if (accountNo == null || accountNo.length() < 4) {
            return accountNo;
        }
        return accountNo.replaceAll(".(?=.{4,})", "*");
    }

    public static String maskName(String name) {
        if (name == null) {
            return null;
        }
        return name.replaceAll("(?<!\\b)\\w", "*");
    }
}
