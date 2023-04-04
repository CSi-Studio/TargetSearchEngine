package net.csibio.tse.constants.enums;

public enum BaselineMethod {
    TOLERANCE("TOLERANCE"), NONE("NONE");

    String name;

    BaselineMethod(String name) {
        this.name = name;
    }

    public static BaselineMethod getByName(String name) {
        for (BaselineMethod method : values()) {
            if (method.getName().equals(name)) {
                return method;
            }
        }
        return null;
    }

    public String getName() {
        return this.name;
    }
}
