import type {Run, WindowRange} from "@/domains/Run.d";
import {Space, Tag} from "antd";
import {FormattedMessage} from "@@/exports";

export function buildRunLabel(run: Run | undefined) {
  if (run && run.name) {
    return <Space>
      <Tag><FormattedMessage id={'position'}/>: {run.platform}{'->'}{run.setName}</Tag>
      <Tag><FormattedMessage id={'model'}/>: {run.msType}</Tag>
      <Tag><FormattedMessage id={'polarity'}/>: {run.polarity}</Tag>
      <Tag><FormattedMessage id={'totalSpectra'}/>: {run.totalCount}</Tag>
      <Tag><FormattedMessage id={'rtUnit'}/>: {run.rtUnit}</Tag>
      <Tag><FormattedMessage id={'activator'}/>: {run.activator}{'-'}{run.energy?.toFixed(2)}</Tag>
    </Space>
  }
  return ""
}

export function buildWindowRangeLabel(windowRange: WindowRange | undefined) {
  if (windowRange) {
    return <Space>{windowRange.mz.toFixed(4)}<Tag
      color={"green"}>{windowRange.start.toFixed(4) + '-' + windowRange.end.toFixed(4)}</Tag></Space>
  } else {
    return '-'
  }
}

