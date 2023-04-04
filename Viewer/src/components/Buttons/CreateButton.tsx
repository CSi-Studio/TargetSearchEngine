import {Button} from 'antd';
import {FormattedMessage} from "@@/plugin-locale";
import {ModalForm} from "@ant-design/pro-form";
import {PlusSquareOutlined} from "@ant-design/icons";

const CreateButton = (doCreate: any, buildContent: any, title?: any, width?: number) => {
  return <ModalForm
    key="create"
    title={title ? title : <FormattedMessage id={'create'}/>}
    trigger={<Button type="primary"><PlusSquareOutlined/> {title? title : <FormattedMessage id={'create'}/>}</Button>}
    width={width? width : 700}
    modalProps={{destroyOnClose: true}}
    layout={'horizontal'}
    onFinish={doCreate}
  >
    {buildContent}
  </ModalForm>;
};

export default CreateButton;
