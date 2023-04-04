package net.csibio.tse.constants.enums;

public enum OverviewType {

    /**
     * 靶向
     */
    Target("Target"),

    /**
     * 非靶向
     */
    Untarget("Untarget"),
    ;

    String name;

    OverviewType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static OverviewType getType(String type) {
        for (OverviewType value : OverviewType.values()) {
            if (value.getName().equals(type)){
                return value;
            }
        }
        return Target;
    }
}
