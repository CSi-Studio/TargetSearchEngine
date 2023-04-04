package net.csibio.tse.constants.enums;

public enum MassDetectionMethod {
    EXACTMASS("EXACTMASS"), CENTROID("CENTROID");

    String name;

    MassDetectionMethod(String name) {
        this.name = name;
    }

    public static MassDetectionMethod getByName(String name) {
        for (MassDetectionMethod method : values()) {
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
