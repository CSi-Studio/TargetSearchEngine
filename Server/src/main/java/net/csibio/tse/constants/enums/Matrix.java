package net.csibio.tse.constants.enums;

public enum Matrix {

    SOLVENT("Solvent"),  //标品
    PLASMA("Plasma"),  //血浆
    URINE("Urine"),  // 尿液
    SERUM("Serum"),  // 血清

    ;

    String name;

    Matrix(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
