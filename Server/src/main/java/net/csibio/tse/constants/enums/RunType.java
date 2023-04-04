package net.csibio.tse.constants.enums;

/**
 * 进样样品的类型
 */
public enum RunType {

    // 普通样本
    SAM("SAM"),
    // 混合Matrix
    MIX("MIX"),
    // 空白样品
    BLK("BLK"),
    // 标准曲线
    STD("STD"),
    // 标准参照
    REF("REF"),;

    String name;

    RunType(String name) {
        this.name = name;
    }

    public static RunType getByName(String name) {
        for (RunType type : values()) {
            if (type.getName().equals(name)) {
                return type;
            }
        }
        return null;
    }

    public String getName() {
        return this.name;
    }
}
