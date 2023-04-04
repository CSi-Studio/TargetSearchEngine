package net.csibio.tse.constants;

public class StatConst {

    /**
     * 用于Target的statMap字段,用于统计每一个靶标的光谱数目
     * 统计项key值,用于在本类的statMap字段中存放统计字段时使用的key名称
     */
    public static String SPEC_COUNT = "T_C";  // Total Count靶标对应的光谱总数
    public static String MS1_RAW_COUNT = "1_R_C";  // Raw Spectra Count 靶标对应的Raw类型的光谱数
    public static String MS1_DEC_COUNT = "1_D_C"; // Deconvoluted Spectra Count靶标对应的光谱总数中
    public static String MS1_STA_COUNT = "1_S_C";  // Standard Spectra Count 靶标对应的光谱总数中
    public static String MS2_RAW_COUNT = "2_R_C";  // Raw Spectra Count 靶标对应的Raw类型的光谱数
    public static String MS2_DEC_COUNT = "2_D_C"; // Deconvoluted Spectra Count 靶标对应的光谱总数中
    public static String MS2_STA_COUNT = "2_S_C"; // Standard Spectra Count 靶标对应的光谱总数中

    public static String STAT_PROJECT_NUM = "ProjectNum";
    public static String STAT_RUN_NUM = "RunNum";
    public static String STAT_LIBRARY_NUM = "LibraryNum";
    public static String STAT_TARGET_NUM = "TargetNum";
    public static String STAT_OVERVIEW_NUM = "OverviewNum";
    public static String STAT_SPECTRA_NUM = "SpectraNum";
    public static String STAT_TRACE_TOTAL_NUM = "TraceTotalNum";
    public static String STAT_TRACE = "Trace";
    public static String STAT_CHECK_4_TARGET = "Check4Target";
    public static String STAT_BASE_PARAMS_UPDATE = "BaseParamsUpdate";
    public static String STAT_MANUAL_INTEGRATION = "ManualIntegration";
    public static String STAT_UPDATE_4_RUN = "Update4Run";
}
