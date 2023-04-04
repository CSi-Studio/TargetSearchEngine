import {Button} from 'antd';
import {FormattedMessage} from "@@/plugin-locale";
import {ModalForm} from "@ant-design/pro-form";
import {EditOutlined} from "@ant-design/icons";
import type {ReactNode} from "react";

const UpdateButton = (doUpdate: any, buildContent: any, object: any, width?: number, title?: ReactNode, primary?: boolean) => {
  return <ModalForm
    key="update"
    title={title ? title : <FormattedMessage id={'update'}/>}
    trigger={<Button type={primary?"primary":"default"} size={'small'}><EditOutlined/> {title? title : <FormattedMessage id={'edit'}/>} </Button>}
    width={width ? width : 600}
    modalProps={{destroyOnClose: true}}
    layout={'horizontal'}
    onFinish={doUpdate}>
    {buildContent(object)}
  </ModalForm>
}

export default UpdateButton;
