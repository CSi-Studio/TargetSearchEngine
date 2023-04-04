package net.csibio.tse.utils;

import net.csibio.aird.bean.common.Xic;
import net.csibio.tse.domain.bean.peak.Peak;
import org.apache.commons.lang3.ArrayUtils;

/**
 * @Description: 针对单张色谱图的方法
 */
public class ChromUtil {

    /**
     * @Description: 检验rtIntensityPairs是否为按RT增序排列
     * @Params: [rtIntensityPairs]
     * @return: boolean
     **/
    public static boolean checkRT(Xic xic) {
        double preRT = Double.NEGATIVE_INFINITY;
        double[] rtList = xic.getRts();
        for (int i = 0; i < rtList.length; i++) {
            if (i == rtList.length - 1) {
                if (rtList[i] > preRT) {
                    return false;
                }
            } else {
                if (rtList[i] < preRT) {
                    return true;
                }
                preRT = rtList[i];
            }
        }
        return true;
    }

    /**
     * @Description: 计算一个Peak的面积
     * @Params: [peak]
     * @return: double
     **/
    public static double calculateArea(Peak peak, Xic rtIntensityPairs) {
        double area = 0d;
        int start = ArrayUtils.indexOf(rtIntensityPairs.getRts(), peak.getRtRange().left());
        int end = ArrayUtils.indexOf(rtIntensityPairs.getRts(), peak.getRtRange().right());
        if (start == -1 || end == -1) {
            return 0f;
        }

        for (int i = start; i <= end; i++) {
            double rtDifference = rtIntensityPairs.getRts()[i + 1] - rtIntensityPairs.getRts()[i];
            rtDifference *= 60d;
            double intensityStart = rtIntensityPairs.getInts()[i];
            double intensityEnd = rtIntensityPairs.getInts()[i + 1];
            area += (rtDifference * (intensityStart + intensityEnd) / 2);
        }
        return area;
    }
}
