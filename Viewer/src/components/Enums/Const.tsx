import {Tag, Tooltip} from "antd";
import {FormattedMessage} from "@@/exports";

export const BaselineMethod = {
  TOLERANCE: {text: 'TOLERANCE', value: 'TOLERANCE'},
  NONE: {text: 'NONE', value: 'NONE'},
};

export const DataType = {
  QCMap: 'QCMap',
  MS1: 'MS1',
  MS2: 'MS2',
  ISArea: 'ISArea',
  ISColumn: 'ISColumn',
  ISEIC: 'ISEIC(Smooth)',
  ISMassAccuracy: 'ISMassAccuracy',
};

export const CheckStatus = {
  Success: {text: <FormattedMessage id={'success'}/>, value: 0},
  Failed: {text: <FormattedMessage id={'failed'}/>, value: 1},
  Unknown: {text: <FormattedMessage id={'unknown'}/>, value: 2},
};

export const CompType = {
  Common: {text: 'Common', value: 'Common'},
  IS: {text: 'Internal Standard', value: 'IS'},
  RS: {text: 'Recovery Standard', value: 'RS'},
  Endogenous: {text: 'Endogenous', value: 'Endogenous'},
};

export const EnergyLevel = [
  {text: 'Low', value: 'Low'},
  {text: 'Med', value: 'Med'},
  {text: 'High', value: 'High'},
];

export const Activator = {
  CID: {text: <Tag color={'#f50'}>CID</Tag>, value: 'CID'},
  ECD: {text: <Tag color={'#2db7f5'}>ECD</Tag>, value: 'ECD'},
  ETD: {text: <Tag color={'#ffc400'}>ETD</Tag>, value: 'ETD'},
  HCD: {text: <Tag color={'#87d068'}>HCD</Tag>, value: 'HCD'},
};

export const getActivatorTag = (tag: string) => {
  if (tag === Activator.CID.value) {
    return <Tag color={'#f50'}>{tag}</Tag>
  } else if (tag === Activator.ECD.value) {
    return <Tag color={'#2db7f5'}>{tag}</Tag>
  } else if (tag === Activator.ETD.value) {
    return <Tag color={'#ffc400'}>{tag}</Tag>
  } else {
    return <Tag color={'#87d068'}>{tag}</Tag>
  }
}

// 获取审核状态对应的系统色彩,默认为待定:Blue
export const getCheckStatusColor = (source: any) => {
  switch (source) {
    case 'Deconvoluted': // Deconvolution
      return 'cyan';
    case 'Raw': // RAW
      return 'gold';
    case 'Standard': // Standard
      return 'lime';
    default: // 待定
      return '#519be8';
  }
};

export const IonizationMod = [
  {text: 'ESI', value: 'ESI'},
  {text: 'EI', value: 'EI'},
];

export const MigrationStrategy = [
  {text: 'None', value: 'None'},
  {text: 'Override', value: 'Override'},
  {text: 'Combine', value: 'Combine'},
];

export const NoiseEstimateMethod = {
  SLIDING_WINDOW_PEAK: {text: 'SLIDING_WINDOW_PEAK', value: 'SLIDING_WINDOW_PEAK'},
  WAVELET_COEFF_PEAK: {text: 'WAVELET_COEFF_PEAK', value: 'WAVELET_COEFF_PEAK'},
  PROPRO_EIC: {text: 'PROPRO_EIC', value: 'PROPRO_EIC'},
  AMPLITUDE_EIC: {text: 'AMPLITUDE_EIC', value: 'AMPLITUDE_EIC'},
  PERCENTAGE_EIC: {text: 'PERCENTAGE_EIC', value: 'PERCENTAGE_EIC'},
};

export const PeakFindingMethod = {
  WAVELET: {text: 'WAVELET', value: 'WAVELET'},
  PROPRO: {text: 'PROPRO', value: 'PROPRO'},
  MZMINE: {text: 'MZMINE', value: 'MZMINE'},
  LOCAL_MINIMUM: {text: 'LOCAL_MINIMUM', value: 'LOCAL_MINIMUM'},
  SAVITZKY_GOLAY: {text: 'SAVITZKY_GOLAY', value: 'SAVITZKY_GOLAY'},
};

export const Polarity = {
  NEGATIVE: {text: <Tag color={'#108ee9'}>NEGATIVE</Tag>, value: 'NEGATIVE'},
  POSITIVE: {text: <Tag color={'#87d068'}>POSITIVE</Tag>, value: 'POSITIVE'},
};

export const getPolarityTag = (tag: string) => {
  if (tag === Polarity.NEGATIVE.value) {
    return <Tag color={'#108ee9'}>{tag}</Tag>
  } else {
    return <Tag color={'#87d068'}>{tag}</Tag>
  }
}

export const RunType = {
  SAM: {text: <Tag color={'#87d068'}>SAM</Tag>, value: 'SAM'},
  REF: {text: <Tag color={'#ffc400'}>REF</Tag>, value: 'REF'},
  MIX: {text: <Tag color={'#2db7f5'}>MIX</Tag>, value: 'MIX'},
  BLK: {text: <Tag color={'#f50'}>BLK</Tag>, value: 'BLK'},
  CUR: {text: <Tag color={'#108ee9'}>CUR</Tag>, value: 'CUR'},
};

export const getRunTag = (tag: string) => {
  if (tag === RunType.BLK.value) {
    return <Tag color={'#f50'}>{tag}</Tag>
  } else if (tag === RunType.MIX.value) {
    return <Tag color={'#2db7f5'}>{tag}</Tag>
  } else if (tag === RunType.REF.value) {
    return <Tag color={'#ffc400'}>{tag}</Tag>
  } else if (tag === RunType.CUR.value) {
    return <Tag color={'#108ee9'}>{tag}</Tag>
  } else {
    return <Tag color={'#87d068'}>{tag}</Tag>
  }
}

export const MsType = {
  PROFILE: {text: <Tag color={'#108ee9'}>PROFILE</Tag>, value: 'PROFILE'},
  CENTROIDED: {text: <Tag color={'#87d068'}>CENTROIDED</Tag>, value: 'CENTROIDED'},
};

export const getMsTypeTag = (tag: string) => {
  if (tag === MsType.PROFILE.value) {
    return <Tag color={'#108ee9'}>{tag}</Tag>
  } else {
    return <Tag color={'#87d068'}>{tag}</Tag>
  }
}

export const ProjectStatus = {
  0: {text: <Tag color={'#f50'}><FormattedMessage id={'acquiring'}/></Tag>, value: 0},
  1: {text: <Tag color={'#2db7f5'}><FormattedMessage id={'inAnalyze'}/></Tag>, value: 1},
  2: {text: <Tag color={'#ffaa0e'}><FormattedMessage id={'underReview'}/></Tag>, value: 2},
  3: {text: <Tag color={'#87d068'}><FormattedMessage id={'finished'}/></Tag>, value: 3},
};

export const ProjectStatusLV = [
  {key: 0, label: <Tag color={'#f50'}><FormattedMessage id={'acquiring'}/></Tag>, value: 0},
  {key: 1, label: <Tag color={'#2db7f5'}><FormattedMessage id={'inAnalyze'}/></Tag>, value: 1},
  {key: 2, label: <Tag color={'#ffaa0e'}><FormattedMessage id={'underReview'}/></Tag>, value: 2},
  {key: 3, label: <Tag color={'#87d068'}><FormattedMessage id={'finished'}/></Tag>, value: 3},
];

export const SmoothMethod = {
  LINEAR: {text: 'LINEAR', value: 'LINEAR'},
  GAUSS: {text: 'GAUSS', value: 'GAUSS'},
  SAVITZKY_GOLAY: {text: 'SAVITZKY_GOLAY', value: 'SAVITZKY_GOLAY'},
  PROPRO_GAUSS: {text: 'PROPRO_GAUSS', value: 'PROPRO_GAUSS'},
  NONE: {text: 'NONE', value: 'NONE'},
};

export const SpectrumSource = {
  Deconvoluted: {text: <Tooltip title={'Deconvolution'}><Tag color={'#038ff8'}>Dec</Tag></Tooltip>, value: 'Deconvoluted'},
  Standard: {text: <Tooltip title={'Standard'}><Tag color={'#4c06fa'}>Std</Tag></Tooltip>, value: 'Standard'},
  Raw: {text: <Tag color={'#06a606'}>Raw</Tag>, value: 'Raw'},
};

export const getSpectrumSourceTag = (tag: string) => {
  switch (tag) {
    case 'Raw': return <Tag color={'#06a606'}>Raw</Tag>
    case 'Deconvoluted': return <Tooltip title={'Deconvolution'}><Tag color={'#038ff8'}>Dec</Tag></Tooltip>
    case 'Standard': return <Tooltip title={'Standard'}><Tag color={'#4c06fa'}>Std</Tag></Tooltip>
    default : return <Tag>??</Tag>
  }
}

export const MsLevel = {
  1: {text: '1', value: 1},
  2: {text: '2', value: 2},
};

export const CheckedStatus = {
  Checked: {text: <Tag color={'#06a606'}>Checked</Tag>, value: true},
  Unchecked: {text: <Tag color={'#ab9200'}>Unchecked</Tag>, value: false},
};

export const getCheckedStatus = (tag: any) => {
  switch (tag) {
    case CheckedStatus.Checked.value:
      return CheckedStatus.Checked.text;
    case CheckedStatus.Unchecked.value:
      return CheckedStatus.Unchecked.text;
  }
  return CheckedStatus.Unchecked.text;
};

export const MsLevelList = [
  {text: '1', value: 1},
  {text: '2', value: 2},
];

export const TaskStatus = {
  UNKNOWN: {text: <Tag color={'#ab9200'}><FormattedMessage id={'UNKNOWN'}/></Tag>, value: 'UNKNOWN'},
  WAITING: {text: <Tag color={'#00219f'}><FormattedMessage id={'WAITING'}/></Tag>, value: 'WAITING'},
  RUNNING: {text: <Tag color={'#4900a0'}><FormattedMessage id={'RUNNING'}/></Tag>, value: 'RUNNING'},
  SUCCESS: {text: <Tag color={'#06a606'}><FormattedMessage id={'SUCCESS'}/></Tag>, value: 'SUCCESS'},
  FAILED: {text: <Tag color={'#f50'}><FormattedMessage id={'FAILED'}/></Tag>, value: 'FAILED'},
  EXCEPTION: {text: <Tag color={'#8a2f00'}><FormattedMessage id={'EXCEPTION'}/></Tag>, value: 'EXCEPTION'},
};

export const getTaskStatusTag = (tag: string) => {
  switch (tag) {
    case TaskStatus.UNKNOWN.value:
      return <Tag color={'#ab9200'}><FormattedMessage id={'UNKNOWN'}/></Tag>;
    case TaskStatus.WAITING.value:
      return <Tag color={'#00219f'}><FormattedMessage id={'WAITING'}/></Tag>;
    case TaskStatus.RUNNING.value:
      return <Tag color={'#4900a0'}><FormattedMessage id={'RUNNING'}/></Tag>;
    case TaskStatus.SUCCESS.value:
      return <Tag color={'#06a606'}><FormattedMessage id={'SUCCESS'}/></Tag>;
    case TaskStatus.FAILED.value:
      return <Tag color={'#f50'}><FormattedMessage id={'FAILED'}/></Tag>;
    case TaskStatus.EXCEPTION.value:
      return <Tag color={'#8a2f00'}><FormattedMessage id={'EXCEPTION'}/></Tag>;
  }
  return <Tag color={'#ab9200'}><FormattedMessage id={'UNKNOWN'}/></Tag>
}

export const TraceOuterType = {
  Project: {text: <FormattedMessage id={'project'}/>, value: 'Project'},
  Library: {text: <FormattedMessage id={'library'}/>, value: 'Library'},
};

export const Template = {
  SCAN_AND_UPLOAD: {text: <FormattedMessage id={'scanUpload'}/>, value: 'SCAN_AND_UPLOAD'},
  LIBRARY_PUSH: {text: <FormattedMessage id={'libraryPush'}/>, value: 'LIBRARY_PUSH'},
  UPLOAD_LIBRARY_FILE: {text: <FormattedMessage id={'uploadLib'}/>, value: 'UPLOAD_LIBRARY_FILE'},
  TARGET_EXTRACTION: {text: <FormattedMessage id={'targetExtraction'}/>, value: 'TARGET_EXTRACTION'},
  TARGET_ANALYZE: {text: <FormattedMessage id={'targetAnalyze'}/>, value: 'TARGET_ANALYZE'},
  PRE_QC: {text: <FormattedMessage id={'preqc'}/>, value: 'PRE_QC'},
  RI_CALIBRATION: {text: <FormattedMessage id={'riCalibration'}/>, value: 'RI_CALIBRATION'},
  BUILD_LIBRARY_TARGET: {text: <FormattedMessage id={'buildLib'}/>, value: 'BUILD_LIBRARY_TARGET'},
};

export const TargetType = {
  Target: {text: <Tag color={'#87d068'}>Target</Tag>, value: 'Target'},
  IS: {text: <Tag color={'#108ee9'}><FormattedMessage id={'IS'}/></Tag>, value: 'IS'},
  RS: {text: <Tag color={'#f50'}><FormattedMessage id={'RS'}/></Tag>, value: 'RS'},
  Endogenous: {text: <Tag color={'#ab9200'}><FormattedMessage id={'Endogenous'}/></Tag>, value: 'Endogenous'},
  SS: {text: <Tag color={'#0034ff'}><FormattedMessage id={'SS'}/></Tag>, value: 'SS'},
  LIIS: {text: <Tag color={'#00ffec'}><FormattedMessage id={'LIIS'}/></Tag>, value: 'LIIS'},
};

export const getTargetTypeTag = (tag: string) => {
  if (tag === TargetType.Target.value) {
    return <Tag color={'#87d068'}>{tag}</Tag>
  } else if (tag === TargetType.IS.value) {
    return <Tag color={'#108ee9'}>{tag}</Tag>
  } else if (tag === TargetType.RS.value) {
    return <Tag color={'#f50'}>{tag}</Tag>
  } else if (tag === TargetType.Endogenous.value) {
    return <Tag color={'#ab9200'}>{tag}</Tag>
  } else if (tag === TargetType.SS.value) {
    return <Tag color={'#0034ff'}>{tag}</Tag>
  } else if (tag === TargetType.LIIS.value) {
    return <Tag color={'#00ffec'}>{tag}</Tag>
  } else {
    return tag
  }
}

export const getSpectrumType = (tag: number) => {
  if (tag === 1) {
    return <Tag color={'#87d068'}>{tag}</Tag>
  } else if (tag == 2) {
    return <Tag color={'#108ee9'}>{tag}</Tag>
  }
  return <Tag>{tag}</Tag>
}

export const LibraryType = {
  INS: {text: <Tag color={'#2db7f5'}><FormattedMessage id={'insLib'}/></Tag>, value: 'INS'},
  ANA: {text: <Tag color={'#87d068'}><FormattedMessage id={'anaLib'}/></Tag>, value: 'ANA'},
};

export const LibraryUnit = {
  Second: {text: <Tag color={'#2db7f5'}><FormattedMessage id={'second'}/></Tag>, value: 'Second'},
  Minute: {text: <Tag color={'#87d068'}><FormattedMessage id={'minute'}/></Tag>, value: 'Minute'},
};

export const LibTypeStr = {
  INS: 'INS',
  ANA: 'ANA',
};

export const YesOrNo = {
  true: {text: <Tag color={'#87d068'}><FormattedMessage id={'yes'}/></Tag>, value: true},
  false: {text: <Tag color={'#f50'}><FormattedMessage id={'no'}/></Tag>, value: false},
};

export const PassOrNot = {
  true: {text: <Tag color={'#87d068'}><FormattedMessage id={'pass'}/></Tag>, value: true},
  false: {text: <Tag color={'#f50'}><FormattedMessage id={'notPass'}/></Tag>, value: false},
};

export const OverviewType = {
  Target: {text: <Tag color={'#2db7f5'}><FormattedMessage id={'target'}/></Tag>, value: 'Target'},
  Untarget: {text: <Tag color={'#87d068'}><FormattedMessage id={'untarget'}/></Tag>, value: 'Untarget'},
};

export const MonitorTipType = {
  InsOutlier: {text: <Tag color={'#2db7f5'}><FormattedMessage id={'insOutliers'}/></Tag>, value: 'InsOutlier'},
  MaxMzPPM: {text: <Tag color={'#87d068'}><FormattedMessage id={'maxMzPpm'}/></Tag>, value: 'MaxMzPPM'},
  MaxRtDiff: {text: <Tag color={'#f50'}><FormattedMessage id={'maxRtDiff'}/></Tag>, value: 'MaxRtDiff'},
  MaxAreaRsd: {text: <Tag color={'#ab9200'}><FormattedMessage id={'maxAreaRsd'}/></Tag>, value: 'MaxAreaRsd'},
};

export const getExistOrNot = (value: any) => {
  if (value) {
    return <Tag color={'#87d068'}><FormattedMessage id={'exist'}/></Tag>
  } else {
    return <Tag color={'#f50'}><FormattedMessage id={'notExist'}/></Tag>
  }
}

export const getPassOrNot = (value: any) => {
  if (value) {
    return <Tag color={'#87d068'}><FormattedMessage id={'pass'}/></Tag>
  } else {
    return <Tag color={'#ff7e3b'}><FormattedMessage id={'notPass'}/></Tag>
  }
}
