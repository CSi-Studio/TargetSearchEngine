package net.csibio.tse.domain.bean.target;

import lombok.Data;

import java.util.List;

@Data
public class TargetRow {

    private static final long serialVersionUID = -3258816519160854625L;

    String id;

    String libType;

    String type;

    String name;

    String code;

    Double mz;

    Double ri;

    Double rt;

    Double rtTolerance;

    List<String> neighbors;

    String comments;

    String features;

    Integer totalSpectra;

}
