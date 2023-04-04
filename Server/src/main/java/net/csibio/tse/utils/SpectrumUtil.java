package net.csibio.tse.utils;

import lombok.NonNull;
import net.csibio.aird.bean.common.IntPair;
import net.csibio.aird.bean.common.Spectrum;
import net.csibio.aird.util.AirdMathUtil;
import org.springframework.beans.BeanUtils;

import java.util.HashMap;
import java.util.TreeSet;

public class SpectrumUtil {

    /**
     * @param pairs
     * @param mzStart
     * @param mzEnd
     * @Description: 在窗口内拿到所有点强度之和
     * @return: double
     **/
    public static double accumulate(@NonNull Spectrum pairs, double mzStart, double mzEnd) {
        double[] mzArray = pairs.getMzs();
        double[] intensityArray = pairs.getInts();
        double result = 0d;
        try {
            //Get index of first mz bigger than mzStart
            IntPair intPair = AirdMathUtil.binarySearch(mzArray, mzStart);
            if (intPair.left() == mzArray.length - 1) {
                return 0d;
            }
            int iterIndex = intPair.right();

            //Accumulate when iterIndex in (mzStart, mzEnd). Return 0 if rightIndex's mz is bigger than mzEnd.
            while (mzArray[iterIndex] <= mzEnd) {
                result += intensityArray[iterIndex];
                iterIndex++;
            }
        } catch (Exception e) {
            return result;
        }
        return result;
    }

    public static void normalize(Spectrum spectrum) {
        double sum = ArrayUtil.sum(spectrum.getInts());
        ArrayUtil.normalize(spectrum.getInts(), sum);
    }

    public static Spectrum mix(Spectrum spectrum1, Spectrum spectrum2) {

        Spectrum spectrumA = clone(spectrum1);
        Spectrum spectrumB = clone(spectrum2);
        normalize(spectrumA);
        normalize(spectrumB);

        HashMap<Double, Double> mapA = new HashMap<>();
        HashMap<Double, Double> mapB = new HashMap<>();
        for (int i = 0; i < spectrumA.getMzs().length; i++) {
            mapA.put(spectrumA.getMzs()[i], spectrumA.getInts()[i]);
        }
        for (int i = 0; i < spectrumB.getMzs().length; i++) {
            mapB.put(spectrumB.getMzs()[i], spectrumB.getInts()[i]);
        }

        TreeSet<Double> mzSet = new TreeSet<>();
        for (double mz1 : spectrumA.getMzs()) {
            mzSet.add(mz1);
        }
        for (double mz1 : spectrumB.getMzs()) {
            mzSet.add(mz1);
        }

        double[] mzs = new double[mzSet.size()];
        double[] ints = new double[mzSet.size()];
        for (int i = 0; i < mzs.length; i++) {
            mzs[i] = mzSet.pollFirst();
            ints[i] = (mapA.getOrDefault(mzs[i], 0.0) + mapB.getOrDefault(mzs[i], 0.0)) / 2;
        }

        return new Spectrum(mzs, ints);
    }

    public static Spectrum clone(Spectrum spectrum) {
        Spectrum spectrum1 = new Spectrum(new double[spectrum.getMzs().length], new double[spectrum.getInts().length]);
        BeanUtils.copyProperties(spectrum, spectrum1);
        return spectrum1;
    }
}
