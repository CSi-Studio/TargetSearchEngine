import {Button, Space, Typography} from 'antd';
import {FormattedMessage} from "@@/plugin-locale";
import {ModalForm} from "@ant-design/pro-form";
import {PullRequestOutlined} from "@ant-design/icons";
import {Key} from 'react';
import {ProForm, ProFormSegmented} from '@ant-design/pro-components';
import LibraryService from "@/services/LibraryService";
import {ProFormSelect} from "@ant-design/pro-components";

const {Text} = Typography;

const PushButton = (doUpdate: any, selectedLibIds: Key[]) => {
  return <ModalForm
    key="push"
    title={<FormattedMessage id={'selectTargetLib'}/>}
    trigger={<Button type="primary"><PullRequestOutlined/> <FormattedMessage id={'push'}/></Button>}
    width={960}
    modalProps={{destroyOnClose: true}}
    layout={'horizontal'}
    onFinish={doUpdate}>

    <Space direction={'vertical'} style={{marginBottom: 20}}>
      <Text><FormattedMessage id={'library.push.rule1'}/></Text>
      <Text><FormattedMessage id={'library.push.rule2'}/></Text>
      <Text><FormattedMessage id={'library.push.rule3'}/></Text>
      <Text><FormattedMessage id={'library.push.rule4'}/></Text>
      <Text><FormattedMessage id={'library.push.rule5'}/></Text>
    </Space>
    <Space direction={'vertical'} style={{marginBottom: 20}}>
      <Text type="success">Selected {selectedLibIds?.length} source libraries:</Text>
      <Text><b>{selectedLibIds?.join(", ")}</b></Text>
    </Space>

    <ProForm.Group>
      <ProFormSelect
        width="sm"
        name="targetLibraryId"
        label={<><FormattedMessage id={'destLibrary'}/></>}
        request={() => new LibraryService().fetchLibLvList(undefined)}
      />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormSegmented
        name={'strategy'}
        label={<FormattedMessage id={'pushStrategy'}/>}
        initialValue={'None'}
        valueEnum={{
          None: <FormattedMessage id={'spectra.not.migrate'}/>,
          Override: <FormattedMessage id={'migrate.override'}/>,
          Combine: <FormattedMessage id={'migrate.merge'}/>
        }}
      >
      </ProFormSegmented>
    </ProForm.Group>
  </ModalForm>;
};

export default PushButton;
