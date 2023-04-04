package net.csibio.tse.constants.enums;

public enum TraceStatus {

    UNKNOWN("UNKNOWN"),
    WAITING("WAITING"),
    RUNNING("RUNNING"),
    SUCCESS("SUCCESS"),
    FAILED("FAILED"),
    EXCEPTION("EXCEPTION"),
    ;

    String name;

    TraceStatus(String name) {
        this.name = name;
    }

    public static TraceStatus getByName(String name) {
        for (TraceStatus status : values()) {
            if (status.getName().equals(name)) {
                return status;
            }
        }
        return null;
    }

    public String getName() {
        return name;
    }
}
