
package net.csibio.tse.constants.enums;

public enum LibraryUnit {

    Second("Second"),
    Minute("Minute"),
    ;

    String name;

    LibraryUnit(String name) {
        this.name = name;
    }

    public static LibraryUnit getByName(String name) {
        for (LibraryUnit libraryType: values()) {
            if (libraryType.getName().equals(name)) {
                return libraryType;
            }
        }
        return null;
    }

    public static LibraryUnit getByName(String name, LibraryUnit defaultType) {
        for (LibraryUnit libraryType: values()) {
            if (libraryType.getName().equals(name)) {
                return libraryType;
            }
        }
        return defaultType;
    }

    public String getName() {
        return this.name;
    }
}
