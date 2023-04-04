package net.csibio.tse.domain.bean.params;

import lombok.Data;

/**
 * Created by Nico Wang
 * Time: 2020-04-08 08:48
 */
@Data
public class ScoreParams {
    //librarySearch
    Double librarySearchBinWidth;

    //score weights
    Double rtScoreWeight;
    Double mzScoreWeight;
    Double ms1ForwardScoreWeight;
    Double ms1ReverseScoreWeight;
    Double ms1IsotopeScoreWeight;
    Double ms2ForwardScoreWeight;
    Double ms2ReverseScoreWeight;

    public void fillParams() {
        if (this.librarySearchBinWidth == null) {
            this.librarySearchBinWidth = 0.001d;
        }
        if (this.rtScoreWeight == null) {
            this.rtScoreWeight = 1d;
        }
        if (this.mzScoreWeight == null) {
            this.mzScoreWeight = 1d;
        }
        if (this.ms1ForwardScoreWeight == null) {
            this.ms1ForwardScoreWeight = 1d;
        }
        if (this.ms1ReverseScoreWeight == null) {
            this.ms1ReverseScoreWeight = 1d;
        }
        if (this.ms1IsotopeScoreWeight == null) {
            this.ms1IsotopeScoreWeight = 1d;
        }
        if (this.ms2ForwardScoreWeight == null) {
            this.ms2ForwardScoreWeight = 1d;
        }
        if (this.ms2ReverseScoreWeight == null) {
            this.ms2ReverseScoreWeight = 1d;
        }
    }

    public void updateParams(ScoreParams params) {
        if (params.librarySearchBinWidth != null) {
            this.librarySearchBinWidth = params.librarySearchBinWidth;
        }
        if (params.rtScoreWeight != null) {
            this.rtScoreWeight = params.rtScoreWeight;
        }
        if (params.mzScoreWeight != null) {
            this.mzScoreWeight = params.mzScoreWeight;
        }
        if (params.ms1ForwardScoreWeight != null) {
            this.ms1ForwardScoreWeight = params.ms1ForwardScoreWeight;
        }
        if (params.ms1ReverseScoreWeight != null) {
            this.ms1ReverseScoreWeight = params.ms1ReverseScoreWeight;
        }
        if (params.ms1IsotopeScoreWeight != null) {
            this.ms1IsotopeScoreWeight = params.ms1IsotopeScoreWeight;
        }
        if (params.ms2ForwardScoreWeight != null) {
            this.ms2ForwardScoreWeight = params.ms2ForwardScoreWeight;
        }
        if (params.ms2ReverseScoreWeight != null) {
            this.ms2ReverseScoreWeight = params.ms2ReverseScoreWeight;
        }
    }
}
