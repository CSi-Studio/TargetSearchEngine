import { Select } from 'antd';
const { Option } = Select;

export function buildOptions(objList: any[]) {
  const options: any[] = [];
  objList.forEach((obj) => {
    if (obj.id !== '-1') {
      options.push(
        <Option key={obj.id} value={obj.id}>
          {obj.name}
        </Option>,
      );
    }
  });
  return options;
}

export const Library = {
  Platform: function (withAll: boolean) {
    return (
      <Select style={{ width: 100 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="LCMS">LCMS</Option>
        <Option value="GCMS">GCMS</Option>
      </Select>
    );
  },
  Type: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="IS">IS</Option>
        <Option value="ANALYTES">ANALYTES</Option>
      </Select>
    );
  },
  DefaultOne: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value={true}>YES</Option>
        <Option value={false}>NO</Option>
      </Select>
    );
  },
  AcquisitionMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="NEGa">NEGa</Option>
        <Option value="NEGb">NEGb</Option>
        <Option value="POSa">POSa</Option>
        <Option value="POSb">POSb</Option>
      </Select>
    );
  },
  Species: function (withAll: boolean, mode: any) {
    return (
      <Select id="species" style={{ width: 120 }} mode={mode ? mode : null}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="solvent">solvent</Option>
        <Option value="human">human</Option>
        <Option value="monkey">monkey</Option>
        <Option value="human_1">human_1</Option>
        <Option value="human_2">human_2</Option>
        <Option value="mouse">mouse</Option>
        <Option value="pig">pig</Option>
        <Option value="rice">rice</Option>
        <Option value="millet">millet</Option>
        <Option value="newt">newt</Option>
        <Option value="deer">deer</Option>
        <Option value="winter melon">winter melon</Option>
      </Select>
    );
  },
  Matrix: function (withAll: boolean, mode: any) {
    return (
      <Select id="matrix" style={{ width: 120 }} mode={mode ? mode : null}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="serum">serum</Option>
        <Option value="plasma">plasma</Option>
        <Option value="urine">urine</Option>
        <Option value="stool">stool</Option>
        <Option value="heart">heart</Option>
        <Option value="liver">liver</Option>
        <Option value="umbilical serum">umbilical serum</Option>
        <Option value="cell">cell</Option>
        <Option value="arterial blood plasma">arterial blood plasma</Option>
        <Option value="kidney">kidney</Option>
        <Option value="venous blood plasma">venous blood plasma</Option>
        <Option value="brain">brain</Option>
        <Option value="fat">fat</Option>
        <Option value="muscle">muscle</Option>
        <Option value="skin">skin</Option>
        <Option value="anther">anther</Option>
        <Option value="root">root</Option>
        <Option value="shoot">shoot</Option>
        <Option value="amniotic fluid">amniotic fluid</Option>
        <Option value="nk cell">nk cell</Option>
        <Option value="urine-derived stem cells">urine-derived stem cells</Option>
        <Option value="nasopharyngeal cell line">nasopharyngeal cell line</Option>
        <Option value="millet">millet</Option>
        <Option value="embryo">embryo</Option>
        <Option value="endosperm">endosperm</Option>
        <Option value="limb">limb</Option>
        <Option value="cell media">cell media</Option>
        <Option value="winter melon">winter melon</Option>
        <Option value="aqueous humor">aqueous humor</Option>
      </Select>
    );
  },
};

export const Experiment = {
  Type: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="SAMPLE">SAMPLE</Option>
        <Option value="PQC">PQC</Option>
        <Option value="BLK">BLK</Option>
        <Option value="REF">REF</Option>
        <Option value="SOLV">SOLV</Option>
      </Select>
    );
  },
};

export const Compound = {
  Type: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="Common">Common</Option>
        <Option value="IS">IS</Option>
        <Option value="RS">RS</Option>
        <Option value="Endogenous">Endogenous</Option>
      </Select>
    );
  },
};

export const Spectra = {
  Type: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="MS1">MS1</Option>
        <Option value="MS2">MS2</Option>
      </Select>
    );
  },
  Source: function (withAll: boolean) {
    return (
      <Select style={{ width: 150 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="Deconvoluted">Deconvoluted</Option>
        <Option value="Standard">Standard</Option>
        <Option value="Raw">Raw</Option>
      </Select>
    );
  },
  EnergyLevel: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="Low">Low</Option>
        <Option value="Med">Med</Option>
        <Option value="High">High</Option>
      </Select>
    );
  },
  FragMod: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="CID">CID</Option>
        <Option value="HCD">HCD</Option>
        <Option value="ETD">ETD</Option>
      </Select>
    );
  },
  IonizationMod: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="ESI">ESI</Option>
        <Option value="EI">EI</Option>
      </Select>
    );
  },
  Polarity: function (withAll: boolean) {
    return (
      <Select style={{ width: 120 }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="Negative">Negative</Option>
        <Option value="Positive">Positive</Option>
      </Select>
    );
  },
};

export const Method = {
  SmoothMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: '100%' }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="LINEAR">LINEAR</Option>
        <Option value="GAUSS">GAUSS</Option>
        <Option value="SAVITZKY_GOLAY">SAVITZKY_GOLAY</Option>
        <Option value="PROPRO_GAUSS">PROPRO_GAUSS</Option>
        <Option value="NONE">NONE</Option>
      </Select>
    );
  },
  PeakFindingMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: '100%' }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="PROPRO">PROPRO</Option>
        <Option value="MZMINE">MZMINE</Option>
        <Option value="WAVELET">WAVELET</Option>
        <Option value="LOCAL_MINIMUM">LOCAL_MINIMUM</Option>
        <Option value="SAVITZKY_GOLAY">SAVITZKY_GOLAY</Option>
      </Select>
    );
  },
  BaselineMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: '100%' }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="TOLERANCE">TOLERANCE</Option>
        <Option value="NONE">NONE</Option>
      </Select>
    );
  },
  EicNoiseEstimateMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: '100%' }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="PROPRO_EIC">PROPRO_EIC</Option>
        <Option value="AMPLITUDE_EIC">AMPLITUDE_EIC</Option>
        <Option value="PERCENTAGE_EIC">PERCENTAGE_EIC</Option>
      </Select>
    );
  },
  PeakNoiseEstimateMethod: function (withAll: boolean) {
    return (
      <Select style={{ width: '100%' }}>
        {withAll ? <Option value="">All</Option> : null}
        <Option value="SLIDING_WINDOW_PEAK">SLIDING_WINDOW_PEAK</Option>
        <Option value="WAVELET_COEFF_PEAK">WAVELET_COEFF_PEAK</Option>
      </Select>
    );
  },
};
