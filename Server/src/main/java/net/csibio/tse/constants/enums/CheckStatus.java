package net.csibio.tse.constants.enums;

public enum CheckStatus {

    SUCCESS(0, "Success"),
    FAIL(1, "Failed"),
    UNKNOWN(2, "Unknown");

    int code;
    String msg;

    CheckStatus(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static CheckStatus getByCode(int code) {
        for (CheckStatus checkStatus : values()) {
            if (checkStatus.getCode() == code) {
                return checkStatus;
            }
        }
        return CheckStatus.UNKNOWN;
    }

    public int getCode() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }
}
