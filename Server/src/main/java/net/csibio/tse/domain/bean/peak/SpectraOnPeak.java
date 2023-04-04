package net.csibio.tse.domain.bean.peak;

import lombok.Data;
import net.csibio.aird.bean.common.Spectrum;

@Data
public class SpectraOnPeak {

    Spectrum ms1;
    Spectrum ms2;
    Spectrum libMs1;
    Spectrum libMs2;
}
