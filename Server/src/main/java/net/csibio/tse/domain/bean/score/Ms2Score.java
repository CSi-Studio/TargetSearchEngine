package net.csibio.tse.domain.bean.score;

import net.csibio.tse.domain.bean.params.ScoreParams;

public record Ms2Score(String spectrumId, String source, Double forward, Double reverse, Double totalScore) {

    public static Ms2Score build(String spectrumId, String source, Double forward, Double reverse, ScoreParams scoreParams) {
        return new Ms2Score(spectrumId, source, forward, reverse, calcTotalScore(forward, reverse, scoreParams));
    }

    private static Double calcTotalScore(Double forward, Double reverse, ScoreParams scoreParams) {
        double totalWeight = 0d, sumScore = 0d;
        if (scoreParams.getMs2ForwardScoreWeight() != null && forward != null) {
            totalWeight += scoreParams.getMs2ForwardScoreWeight();
            sumScore += forward * scoreParams.getMs2ForwardScoreWeight();
        }
        if (scoreParams.getMs2ReverseScoreWeight() != null && reverse != null) {
            totalWeight += scoreParams.getMs2ReverseScoreWeight();
            sumScore += reverse * scoreParams.getMs2ReverseScoreWeight();
        }
        if (totalWeight != 0) {
            return sumScore / totalWeight;
        } else {
            return null;
        }
    }
}
