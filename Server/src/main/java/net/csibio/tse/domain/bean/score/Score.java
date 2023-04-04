package net.csibio.tse.domain.bean.score;

import lombok.Data;
import net.csibio.tse.domain.bean.params.ScoreParams;

import java.util.List;

@Data
public class Score {

    /**
     * 这里特指rt的打分
     */
    Double rt;
    /**
     * 这里特指mz的打分
     */
    Double mz;

    List<Ms1Score> ms1Scores;

    List<Ms2Score> ms2Scores;

    Integer maxMs1SpectrumIndex;

    Integer maxMs2SpectrumIndex;

    //选取分数最高的ms1ms2打分
    Double totalScore;

    public void calculateTotalScore(ScoreParams scoreParams) {
        double totalWeight = 0d, sumScore = 0d;
        if (scoreParams.getRtScoreWeight() != null && this.rt != null) {
            totalWeight += scoreParams.getRtScoreWeight();
            sumScore += this.rt * scoreParams.getRtScoreWeight();
        }
        if (scoreParams.getMzScoreWeight() != null && this.mz != null) {
            totalWeight += scoreParams.getMzScoreWeight();
            sumScore += this.mz * scoreParams.getMzScoreWeight();
        }
        if (this.maxMs1SpectrumIndex != null) {
            Ms1Score ms1Score = this.ms1Scores.get(this.maxMs1SpectrumIndex);
            if (scoreParams.getMs1ForwardScoreWeight() != null && ms1Score.forward() != null) {
                totalWeight += scoreParams.getMs1ForwardScoreWeight();
                sumScore += ms1Score.forward() * scoreParams.getMs1ForwardScoreWeight();
            }
            if (scoreParams.getMs1ReverseScoreWeight() != null && ms1Score.reverse() != null) {
                totalWeight += scoreParams.getMs1ReverseScoreWeight();
                sumScore += ms1Score.reverse() * scoreParams.getMs1ReverseScoreWeight();
            }
            if (scoreParams.getMs1IsotopeScoreWeight() != null && ms1Score.isotope() != null) {
                totalWeight += scoreParams.getMs1IsotopeScoreWeight();
                sumScore += ms1Score.isotope() * scoreParams.getMs1IsotopeScoreWeight();
            }
        }
        if (this.maxMs2SpectrumIndex != null) {
            Ms2Score ms2Score = this.ms2Scores.get(this.maxMs2SpectrumIndex);
            if (scoreParams.getMs2ForwardScoreWeight() != null && ms2Score.forward() != null) {
                totalWeight += scoreParams.getMs2ForwardScoreWeight();
                sumScore += ms2Score.forward() * scoreParams.getMs2ForwardScoreWeight();
            }
            if (scoreParams.getMs2ReverseScoreWeight() != null && ms2Score.reverse() != null) {
                totalWeight += scoreParams.getMs2ReverseScoreWeight();
                sumScore += ms2Score.reverse() * scoreParams.getMs2ReverseScoreWeight();
            }
        }

        if (totalWeight != 0) {
            this.totalScore = sumScore / totalWeight;
        } else {
            this.totalScore = 0D;
        }
    }

    public String getMaxScoreMs1SpectrumId() {
        if (ms1Scores != null && maxMs1SpectrumIndex != null && maxMs1SpectrumIndex < ms1Scores.size() - 1) {
            return ms1Scores.get(maxMs1SpectrumIndex).spectrumId();
        }
        return null;
    }

    public String getMaxScoreMs2SpectrumId() {
        if (ms2Scores != null && maxMs2SpectrumIndex != null && maxMs2SpectrumIndex < ms2Scores.size() - 1) {
            return ms2Scores.get(maxMs2SpectrumIndex).spectrumId();
        }
        return null;
    }
}
