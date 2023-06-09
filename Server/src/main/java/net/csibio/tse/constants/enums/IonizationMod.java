package net.csibio.tse.constants.enums;

public enum IonizationMod {

    ESI("ESI"),
    EI("EI"),
    ;

    String name;

    IonizationMod(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
