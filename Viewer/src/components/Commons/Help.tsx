import { Descriptions, Table } from 'antd';
import {FormattedMessage} from "@@/exports";

export function qcMapHelper() {
  return (
    <Descriptions
      title={<FormattedMessage id={'shapeDescription'}/>}
      column={{ xxl: 6, xl: 6, lg: 6, md: 3, sm: 2, xs: 1 }}
      bordered
    >
      <Descriptions.Item label={<FormattedMessage id={'triangle'}/>}>{'Total<0.75'}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id={'diamond'}/>}>{'Total≥0.75'} <FormattedMessage id={'and'}/> {'(MS2<0.5'} <FormattedMessage id={'or'}/> <FormattedMessage id={'no'}/> {'MS2)'}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id={'square'}/>}>{'Total≥0.75'} <FormattedMessage id={'and'}/> {'0.5≤MS2＜0.75'}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id={'arrow'}/>}>{'Total≥0.75'} <FormattedMessage id={'and'}/> {'MS2≥0.75'}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id={'hollow'}/>}>{'MS2'} <FormattedMessage id={'notExist'}/></Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id={'solid'}/>}>{'MS2'} <FormattedMessage id={'exist'}/></Descriptions.Item>
    </Descriptions>
  );
}

export function insTypeHelper() {
  return (
    <Descriptions
      title={<FormattedMessage id={'insTargetDescription'}/>}
      column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      bordered
    >
      <Descriptions.Item label="Target">{<FormattedMessage id={'commonTarget'}/>}</Descriptions.Item>
      <Descriptions.Item label="IS">
        {<FormattedMessage id={'ISDesc'}/>}
      </Descriptions.Item>
      <Descriptions.Item label="RS">
        {<FormattedMessage id={'RSDesc'}/>}
      </Descriptions.Item>
      <Descriptions.Item label="Endogenous">{<FormattedMessage id={'EndogenousDesc'}/>}</Descriptions.Item>
      <Descriptions.Item label="SS">
        {<FormattedMessage id={'SSDesc'}/>}
      </Descriptions.Item>
      <Descriptions.Item label="LIIS">{<FormattedMessage id={'LIISDesc'}/>}</Descriptions.Item>
    </Descriptions>
  );
}

export function qcMethodHelper() {
  const columns = [
    {
      title: 'Method type',
      dataIndex: 'p0',
      key: 'p0',
    },
    {
      title: 'Standard added before sample processing',
      dataIndex: 'p1',
      key: 'p1',
    },
    {
      title: 'Standard added after all sample processing',
      dataIndex: 'p2',
      key: 'p2',
    },
    {
      title: 'Quantification',
      dataIndex: 'p3',
      key: 'p3',
    },
  ];
  const dataSource = [
    {
      key: '1',
      p0: 'Isotopic Dilution Method',
      p1: 'Internal Standard (IS)',
      p2: 'Recovery Standard (RS)',
      p3: 'IS quantifies native; RS quantifies IS.',
    },
    {
      key: '2',
      p0: 'Internal Standard Method',
      p1: 'Surrogate Standard (SS)',
      p2: 'Internal Standard (IS)',
      p3: 'IS quantifies native and SS; SS indicates efficiency of handling and matrix effects',
    },
    {
      key: '3',
      p0: 'Isotopic dilution + internal standard method',
      p1: 'Internal Standard (IS)',
      p2: 'Labelled internal injection standard (LIIS)',
      p3: 'IS quantifies native; LIIS quantifies IS',
    },
    {
      key: '4',
      p0: 'External Standard Method',
      p1: 'Surrogate Standard (SS)',
      p2: 'NA: No internal standard added',
      p3: 'Native is quantified directly off a calibration curve (not corrected with internal standard); SS indicates extraction efficiencies of natives',
    },
  ];
  return (
    <Table
      rowKey={'p0'}
      title={() =>
        '质控方法说明: https://www.pacificrimlabs.com/blog/naming-of-standards-in-analytical-chemistry'
      }
      dataSource={dataSource}
      columns={columns}
    />
  );
}
