package net.csibio.tse.constants.enums;

public enum FragMod {

    CID("CID"),
    HCD("HCD"),
    ETD("ETD"),
    ;

    String name;

    FragMod(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
