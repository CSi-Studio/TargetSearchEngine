package net.csibio.tse.domain.bean.params;

import lombok.Data;

@Data
public class JoinAlignParams {
    double mzTolerance = 0.005;
    double rtTolerance = 0.3;//absolute min
    double mzWeight = 7.5;
    double rtWeight = 1.0;
}
