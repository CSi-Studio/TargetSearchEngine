import {Button} from 'antd';
import {ModalForm} from "@ant-design/pro-form";
import type {ReactNode} from "react";

const DialogButton = (doAction: any, content: any, btnTitle: ReactNode, title: ReactNode, width?: number) => {
  return <ModalForm
    key="dialog"
    title={title}
    trigger={<Button type="primary" size={'small'}> {btnTitle} </Button>}
    width={width ? width : 600}
    modalProps={{destroyOnClose: true}}
    layout={'horizontal'}
    onFinish={doAction}>
    {content}
  </ModalForm>;
};

export default DialogButton;
