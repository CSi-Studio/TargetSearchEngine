package net.csibio.tse.domain.bean.peak;

import lombok.Data;
import net.csibio.aird.bean.common.DoublePair;

@Data
public class NoScorePeak {
    /**
     * 原始峰最高点的Mz
     */
    Double apexMz;

    /**
     * 原始峰最高点的RT
     */
    Double apexRt;

    /**
     * 最高点RT换算成RI
     */
    Double apexRi;

    /**
     * 原始峰最高点的Intensity
     */
    Double apexInt;
    /**
     * 峰的RT范围
     */
    DoublePair rtRange;

    /**
     * 峰的定量面积
     */
    Double area;

    /**
     * 半峰宽
     */
    Double fwhm;
}
