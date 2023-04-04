package net.csibio.tse.domain.bean.params;

import lombok.Data;
import net.csibio.tse.constants.NumericalConst;

@Data
public class DinosaurParams {
    // centroid
    Double intensityThreshold = 10000.0;

    Boolean maxIntensity = false;

    Boolean gaussianEst = true;

    // hill build
    Double hillPPM = 8.0;

    Integer hillMaxMissing = 1;

    Integer hillMinLength = 7;

    Double hillPeakFactor = 2.0;

    Integer hillPeakFactorMinLength = 40;

    Integer hillMzGuessLength = 3;

    Integer hillSmoothMedianWindow = 1;

    Integer hillSmoothMeanWindow = 1;

    Boolean noHillSplit = false;

    Double hillValleyFactor = 1.3;

    // adduct
    Double adductRtTolerance = 0.3;

    public double getMzTolerance(double mz) {
        return mz * this.hillPPM / NumericalConst.MILLION;
    }

}
