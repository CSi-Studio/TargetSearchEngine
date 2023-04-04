package net.csibio.tse.domain.bean.score;

import net.csibio.tse.domain.bean.params.ScoreParams;

/**
 * @param spectrumId
 * @param source     spectrum
 * @param forward
 * @param reverse
 * @param isotope
 * @param totalScore
 */
public record Ms1Score(String spectrumId, String source, Double forward, Double reverse, Double isotope,
                       Double totalScore) {

    public static Ms1Score build(String spectrumId, String source, Double forward, Double reverse, Double isotope, ScoreParams scoreParams) {
        return new Ms1Score(spectrumId, source, forward, reverse, isotope, calcTotalScore(forward, reverse, isotope, scoreParams));
    }

    private static Double calcTotalScore(Double forward, Double reverse, Double isotope, ScoreParams scoreParams) {
        double totalWeight = 0d, sumScore = 0d;
        if (scoreParams.getMs1ForwardScoreWeight() != null && forward != null) {
            totalWeight += scoreParams.getMs1ForwardScoreWeight();
            sumScore += forward * scoreParams.getMs1ForwardScoreWeight();
        }
        if (scoreParams.getMs1ReverseScoreWeight() != null && reverse != null) {
            totalWeight += scoreParams.getMs1ReverseScoreWeight();
            sumScore += reverse * scoreParams.getMs1ReverseScoreWeight();
        }
        if (scoreParams.getMs1IsotopeScoreWeight() != null && isotope != null) {
            totalWeight += scoreParams.getMs1IsotopeScoreWeight();
            sumScore += isotope * scoreParams.getMs1IsotopeScoreWeight();
        }
        if (totalWeight != 0) {
            return sumScore / totalWeight;
        } else {
            return null;
        }
    }
}
