import {notBlank} from '@/utils/StringUtil';
import {Tag} from 'antd';
import {isNull} from 'lodash';
import type {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage} from "@@/exports";
import type {IdName} from "@/domains/Common";

export const AdductColumns = [
  {
    title: 'ionForm',
    key: 'ionForm',
    dataIndex: 'ionForm',
    sorter: (a: any, b: any) => a.ionForm.localeCompare(b.ionForm),
  },
  {
    title: 'Target m/z',
    key: 'mz',
    dataIndex: 'mz',
    render: (text: number) => text.toFixed(4),
    sorter: (a: any, b: any) => a.mz - b.mz,
  },
  {
    title: 'Charge',
    key: 'charge',
    dataIndex: 'charge',
    render: (text: number) => {
      return text > 0 ? '+' + text : text;
    },
    sorter: (a: any, b: any) => a.charge - b.charge,
  },
  {
    title: 'adductMw',
    key: 'mw',
    dataIndex: 'mw',
    render: (text: number) => text.toFixed(4),
    sorter: (a: any, b: any) => a.mw - b.mw,
  },
];

export const IdNameColumn: ProColumns<IdName>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    hideInSearch: true,
  },
  {
    key: 'name',
    title: <FormattedMessage id={'name'}/>,
    dataIndex: 'name',
  },
]

export const splitToTag = (kvStr: string) => {
  if (isNull(kvStr)) {
    return '';
  }
  const kvList = kvStr.split(';');
  const tagList: any[] = [];
  kvList.forEach((kv) => {
    if (notBlank(kv.trim())) {
      const kAndV = kv.split(':');
      tagList.push(
        <Tag key={kAndV[1]} color="blue">
          {kAndV[1]}
        </Tag>,
      );
    }
  });
  return <>{tagList}</>;
};

export function transToTags(tags: string[] | undefined, color?: string) {
  if (tags) {
    const tagList: any[] = [];
    tags.forEach((tag) => {
      if (notBlank(tag.trim())) {
        tagList.push(
          <Tag key={tag} color={color ? color : 'green'}>
            {tag}
          </Tag>,
        );
      }
    });
    return tagList;
  } else {
    return [];
  }
}
