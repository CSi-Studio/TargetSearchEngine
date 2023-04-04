package net.csibio.tse.constants.enums;

public enum StatDim {

    Day("Day"),
    Week("Week"),
    Month("Month"),
    Year("Year"),
    ;

    String dim;

    StatDim(String dim) {
        this.dim = dim;
    }

    public String getDim() {
        return dim;
    }
}
