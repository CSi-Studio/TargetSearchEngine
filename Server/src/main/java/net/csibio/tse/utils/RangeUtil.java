package net.csibio.tse.utils;

import net.csibio.tse.constants.NumericalConst;
import org.apache.commons.math3.util.Pair;


public class RangeUtil {

    public static Pair<Double, Double> getMzRange(Double mz, Double ppmWindow) {
        double mzWindow = mz * ppmWindow / NumericalConst.MILLION;  // 将PPM的mzWindow转化为道尔顿的mzWindow
        return new Pair<Double, Double>(mz - mzWindow, mz + mzWindow);
    }

    public static Pair<Double, Double> getRtRange(Double rt, Double rtWindow) {
        return new Pair<Double, Double>(rt - rtWindow, rt + rtWindow);
    }
}
