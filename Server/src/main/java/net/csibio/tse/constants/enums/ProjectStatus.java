package net.csibio.tse.constants.enums;

public enum ProjectStatus {

    COLLECTING(0, "采集中"),
    ANALYZING(1, "分析中"),
    REVIEWING(2, "审核中"),
    FINISHED(3, "已完结"),
    ;

    int code;
    String msg;

    ProjectStatus(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }
}
