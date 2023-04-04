package net.csibio.tse.constants.enums;

public enum MonitorTipType {

    InsOutlier("InsOutlier"),
    MaxMzPPM("MaxMzPPM"),
    MaxRtDiff("MaxRtDiff"),
    MaxAreaRsd("MaxAreaRsd"),
    ;

    String name;

    MonitorTipType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
