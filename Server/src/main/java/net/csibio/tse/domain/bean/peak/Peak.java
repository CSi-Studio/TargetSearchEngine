package net.csibio.tse.domain.bean.peak;

import lombok.Data;
import net.csibio.aird.bean.common.DoublePair;
import net.csibio.aird.bean.common.IntPair;
import net.csibio.tse.domain.bean.score.Score;

@Data
public class Peak extends NoScorePeak {

    /**
     * 峰的子分数
     */
    Score score;
    /**
     * 横向比对过程中，划分成的靶标
     */
    Integer peakIntCode;

    /**
     * 峰的RT范围对应xic数组中的index,需要注意靶向分析的xic不是全部的xic
     */
    IntPair rtRangeIndex;
    /**
     * baseline高度范围
     */
    DoublePair baseLineRange;
    /**
     * xic中的index, 需要注意靶向分析的xic不是全部的xic
     */
    int midIndex;
}
