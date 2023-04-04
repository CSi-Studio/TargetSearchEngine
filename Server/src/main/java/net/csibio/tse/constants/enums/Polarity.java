package net.csibio.tse.constants.enums;

public enum Polarity {

    Negative("NEGETIVE"),
    Positive("POSITIVE"),
    ;

    String name;

    Polarity(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
