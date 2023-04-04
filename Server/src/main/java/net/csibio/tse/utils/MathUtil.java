package net.csibio.tse.utils;

import net.csibio.aird.bean.common.Xic;

public class MathUtil {

    public static double integrate(Xic xic, int leftIndex, int rightIndex) {
        double intensity = 0d;
        for (int i = leftIndex + 1; i <= rightIndex; i++) {
            //area of trapezoid
            intensity += (xic.getRts()[i] - xic.getRts()[i - 1]) * (xic.getInts()[i - 1] + xic.getInts()[i]) / 2;
        }
        return intensity;
    }

    public static double integrate(Xic xic, int leftIndex, int rightIndex, double leftBaseline, double rightBaseline) {
        double intensity = 0d;
        double baselineStep = (rightBaseline - leftBaseline) / (rightIndex - leftIndex);
        for (int i = leftIndex + 1; i <= rightIndex; i++) {
            double leftIntensity = xic.getInts()[i - 1] - (leftBaseline + (i - leftIndex - 1) * baselineStep);
            double rightIntensity = xic.getInts()[i] - (leftBaseline + (i - leftIndex) * baselineStep);
            if (leftIntensity < 0d || rightIntensity < 0d) {
                continue;
            }
            //area of trapezoid
            intensity += (xic.getRts()[i] - xic.getRts()[i - 1]) * (leftIntensity + rightIntensity) / 2d;
        }
        return intensity;
    }
}
