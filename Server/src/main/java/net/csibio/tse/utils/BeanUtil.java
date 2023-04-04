package net.csibio.tse.utils;

import java.util.HashSet;

public class BeanUtil {

    public static Object merge(Object master, Object slave) {
        if (master != null) {
            return master;
        } else if (slave != null) {
            return slave;
        } else {
            return null;
        }
    }

    public static HashSet merge(HashSet master, HashSet slave) {
        if (master != null && slave != null) {
            master.addAll(slave);
            return master;
        }
        if (master != null) {
            return master;
        } else if (slave != null) {
            return slave;
        } else {
            return null;
        }
    }
}
