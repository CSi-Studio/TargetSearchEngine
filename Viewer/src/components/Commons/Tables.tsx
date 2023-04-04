import { AdductColumns } from '@/components/Commons/Columns';
import { Table, Tag } from 'antd';

export function buildAdductTable(adductList: [], mass: number) {
  <Table
    title={() => <Tag color="red">Current M: {mass}</Tag>}
    style={{ marginTop: 5 }}
    size="small"
    dataSource={adductList}
    columns={AdductColumns}
    rowKey="ionForm"
    pagination={false}
  />;
}
