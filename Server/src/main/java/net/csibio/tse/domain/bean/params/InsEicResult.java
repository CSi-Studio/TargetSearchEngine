package net.csibio.tse.domain.bean.params;

import lombok.Data;
import net.csibio.aird.bean.common.Xic;
import net.csibio.tse.domain.bean.target.TargetRow;
import org.apache.commons.math3.util.Pair;

import java.util.List;
import java.util.Map;

/**
 * 用于存储在同一个进样文件中多个mz对应的intensity EIC结果
 */
@Data
public class InsEicResult {

    List<Double> rtList;

    // 存储每一个scan中intensity最大的点的mz-intensity数组,与rtList数组长度一致
    List<Pair> maxIntPairs;

    // Key为靶标ID
    Map<String, Xic> rtIntensityMap;

    Map<String, TargetRow> targetMap;

    Map<String, Double> fwhmMap;

    public InsEicResult() {
    }

    public InsEicResult(List<Double> rtList, Map<String, Xic> rtIntensityMap,
                        Map<String, TargetRow> targetMap, List<Pair> maxIntPairs, Map<String, Double> fwhmMap) {
        this.rtList = rtList;
        this.rtIntensityMap = rtIntensityMap;
        this.targetMap = targetMap;
        this.maxIntPairs = maxIntPairs;
        this.fwhmMap = fwhmMap;
    }
}
