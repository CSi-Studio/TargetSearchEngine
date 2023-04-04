package net.csibio.tse.domain.bean.params;

import org.springframework.data.annotation.Transient;

public class SigmaSpacing {

    /**
     * 一般默认为 0.025
     */
    Double sigma;

    /**
     * 一般默认为0.001
     */
    Double spacing;

    @Transient
    double[] coeffs;

    Integer rightNum;

    Double rightNumSpacing;

    public SigmaSpacing() {
    }

    public SigmaSpacing(Double sigma, Double spacing) {
        this.sigma = sigma;
        this.spacing = spacing;
    }

    public static SigmaSpacing create() {
        SigmaSpacing sigmaSpacing = new SigmaSpacing();
        sigmaSpacing.setSigma(0.005d);
        sigmaSpacing.setSpacing(0.0001d);
        return sigmaSpacing;
    }

    public Double getSigma() {
        if (sigma == null) {
            sigma = 0.025d;
        }
        return sigma;
    }

    public void setSigma(Double sigma) {
        this.sigma = sigma;
    }

    public Double getRightNumSpacing() {
        if (rightNumSpacing == null) {
            rightNumSpacing = getRightNum() * getSpacing();
        }
        return rightNumSpacing;
    }

    public Double getSpacing() {
        if (spacing == null) {
            spacing = 0.001d;
        }
        return spacing;
    }

    public void setSpacing(Double spacing) {
        this.spacing = spacing;
    }

    public double[] getCoeffs() {
        if (coeffs == null) {
            rightNum = getRightNum(getSigma(), getSpacing());
            coeffs = getCoeffs(getSigma(), getSpacing(), rightNum);
        }
        return coeffs;
    }

    public int getRightNum() {
        if (rightNum == null) {
            rightNum = getRightNum(getSigma(), getSpacing());
        }
        return rightNum;
    }

    private int getRightNum(double sigma, double spacing) {
        return (int) Math.ceil(4 * sigma / spacing) + 1;
    }

    private double[] getCoeffs(double sigma, double spacing, int coeffSize) {
        if (coeffs == null) {
            coeffs = new double[coeffSize];
            for (int i = 0; i < coeffSize; i++) {
                coeffs[i] = 1d / (sigma * Math.sqrt(2d * Math.PI)) * Math.exp(-((i * spacing) * (i * spacing)) / (2d * sigma * sigma));
            }
        }

        return coeffs;
    }

}
