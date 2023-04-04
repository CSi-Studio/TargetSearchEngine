import { useState } from 'react';
import {Button, Popover, Space} from 'antd';
import {FormattedMessage} from "@@/plugin-locale";
import {MinusSquareOutlined} from "@ant-design/icons";

const DeleteButton = (doDelete: any) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const doClick = () => {
    hide();
    doDelete();
  }
  return (
    <Popover
      key={'deleteBtn'}
      content={<Space>
        <Button size={'small'} danger={true} onClick={()=>doClick()}><FormattedMessage id={'confirm'}/></Button>
        <Button size={'small'} onClick={()=>hide()}><FormattedMessage id={'cancel'}/></Button></Space>}
      title={<FormattedMessage id={'confirm.to.delete'}/>}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button danger={true} type="primary"><MinusSquareOutlined /> <FormattedMessage id={'delete'}/></Button>
    </Popover>
  );
};

export default DeleteButton;
