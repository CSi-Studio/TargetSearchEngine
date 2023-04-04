package net.csibio.tse.domain.bean.params;

import lombok.Data;
import net.csibio.tse.constants.enums.MassDetectionMethod;
import org.apache.commons.lang3.StringUtils;

@Data
public class UntargetPeakFindParams {
    /**
     * mass detect
     *
     * @see net.csibio.tse.constants.enums.MassDetectionMethod
     */
    String massDetectionMethod;
    Double noiseLevel; // 底噪
    Boolean detectIsotopes;

    // centroid params

    // exact mass params



    public void fillParams() {
        if (StringUtils.isEmpty(this.massDetectionMethod)) {
            this.massDetectionMethod = MassDetectionMethod.EXACTMASS.getName();
        }
    }


}
