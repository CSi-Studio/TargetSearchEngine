package net.csibio.tse.constants.enums;

public enum EnergyLevel {

    Low("Low"),
    Med("Med"),
    High("High"),
    ;

    String name;

    EnergyLevel(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
