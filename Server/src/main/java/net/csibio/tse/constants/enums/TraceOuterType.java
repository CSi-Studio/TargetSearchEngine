package net.csibio.tse.constants.enums;

public enum TraceOuterType {

    Project("Project"),

    Set("Set"),

    Library("Library"),
    ;

    String name;


    TraceOuterType(String name) {
        this.name = name;
    }

    public static TraceOuterType getByName(String name) {
        for (TraceOuterType status : values()) {
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
