import {buildBarForTrace, buildSimplePie} from '@/components/Charts/SimpleChartFactory';
import type {Pagination} from '@/domains/Common';
import type {Stat, SystemInfo} from '@/domains/Stat.d';
import type {Trace} from '@/domains/Trace.d';
import {buildColumn} from '@/pages/dashboard/Column';
import StatService from '@/services/StatService';
import {
  FileZipOutlined,
  GlobalOutlined,
  IdcardOutlined,
  InteractionOutlined,
  MacCommandOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import {StatisticCard} from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import {Button, Calendar, Card, Col, Descriptions, Row, Spin, Tag} from 'antd';
import type {EChartsType} from 'echarts';
import React, {useEffect, useState} from 'react';
import dayjs from "dayjs";
import {FormattedMessage, useIntl} from "@@/exports";
import type {Result} from "@/domains/Common";
import {useRef} from "react";
import type {ActionType} from "@ant-design/pro-table";

const Index: React.FC = () => {
  const statService = new StatService();
  const DIV_CPU = 'cpu';
  const DIV_MEM = 'mem';
  const DIV_DISK = 'disk';
  const DIV_TRACE = 'trace';

  //全局变量区域
  const [globalStat, setGlobalStat] = useState<Stat>(); //选中日的统计信息
  const [loading, setLoading] = useState<boolean>(false); //全局loading状态
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs(new Date())); //日历的当前选中日期
  const [systemInfo, setSystemInfo] = useState<SystemInfo>(); //日历的当前选中日期
  const [cpuChart, setCpuChart] = useState<EChartsType>(); //CPU消耗
  const [memChart, setMemChart] = useState<EChartsType>(); //内存消耗
  const [diskChart, setDiskChart] = useState<EChartsType>(); //磁盘消耗
  const imgStyle = {display: 'block', width: 40, height: 40};
  const DATE_FORMAT: string = 'YYYYMMDD';

  const HMDB = <a href={'https://hmdb.ca/'} target={'_blank'} rel="noreferrer">HMDB</a>;
  const KEGG = <a href={'https://www.genome.jp/kegg/'} target={'_blank'} rel="noreferrer">KEGG</a>;
  const MassBank = <a href={'https://massbank.eu/MassBank/'} target={'_blank'} rel="noreferrer">MassBank</a>;
  const GNPS = <a href={'https://gnps.ucsd.edu/'} target={'_blank'} rel="noreferrer">GNPS</a>;
  const AirdPro = <a href={'https://github.com/CSi-Studio/AirdPro'} target={'_blank'} rel="noreferrer">AirdPro</a>;
  const AirdSDK = <a href={'https://github.com/CSi-Studio/Aird-SDK/'} target={'_blank'} rel="noreferrer">AirdSDK</a>;
  const MSNET3D = <a href={'https://github.com/CSi-Studio/3D-MSNet'} target={'_blank'} rel="noreferrer">3D-MSNet</a>;
  const Injection = <a href={'http://injection.design'} target={'_blank'} rel="noreferrer"><FormattedMessage
    id={'injectionDesign'}/></a>;
  const intl = useIntl();
  const tableRef = useRef<ActionType>(); //Table组件的引用
  async function doList(params: { pageSize: number; current: number }): Promise<Result<Trace[]>> {
    const result = await statService.getRunningTraceList({...params});
    return Promise.resolve(result);
  }

  const init = async () => {
    const rightNow = await statService.systemInfo();
    setSystemInfo(rightNow.data);
    setInterval(async function () {
      const result = await statService.systemInfo();
      setSystemInfo(result.data);
      tableRef?.current?.reload();
    }, 3000);
  };

  const renderCpuChart = (info: SystemInfo) => {
    const cpuDiv = document.getElementById(DIV_CPU);
    const cpuDataList = [
      {name: 'User', value: info.cpu.user},
      {name: 'Idle', value: info.cpu.idle}, //空闲
      {name: 'Nice', value: info.cpu.nice},
      {name: 'System', value: info.cpu.system},
      {name: 'IOWait', value: info.cpu.iowait},
      {name: 'IRQ', value: info.cpu.irq},
      {name: 'SoftIRQ', value: info.cpu.softirq},
      {name: 'Steal', value: info.cpu.steal},
    ];
    if (!cpuChart) {
      const cpuChartNow = buildSimplePie(cpuDiv, cpuDataList);
      setCpuChart(cpuChartNow);
    } else {
      const option = cpuChart.getOption();
      option.series = [
        {
          type: 'pie',
          label: {position: 'outer'},
          data: cpuDataList,
        },
      ];
      cpuChart.setOption(option);
    }
  };

  const renderMemChart = (info: SystemInfo) => {
    const memDiv = document.getElementById(DIV_MEM);
    const memDataList = [
      {
        name: intl.formatMessage({id: 'totalLeft'}) + ":",
        value: ((info.mem.totalMem - info.mem.jvmMaxMem) / 1024 / 1024 / 1024).toFixed(1)
      },
      {
        name: intl.formatMessage({id: 'jvmLeft'}) + ":",
        value: ((info.mem.jvmMaxMem - info.mem.jvmUsedMem) / 1024 / 1024 / 1024).toFixed(1)
      },
      {name: intl.formatMessage({id: 'jvmUsed'}) + ":", value: (info.mem.usedMem / 1024 / 1024 / 1024).toFixed(1)},
    ];
    if (!memChart) {
      const memChartNow = buildSimplePie(memDiv, memDataList);
      setMemChart(memChartNow);
    } else {
      const option = memChart.getOption();
      option.series = [
        {
          type: 'pie',
          label: {position: 'outer', overflow: 'break', formatter: '{b}{c}GB-{d}%'},
          data: memDataList,
        },
      ];
      memChart.setOption(option);
    }
  };

  const renderDiskChart = (info: SystemInfo) => {
    const diskDiv = document.getElementById(DIV_DISK);
    const diskDataList = [
      {
        name: intl.formatMessage({id: 'used'}) + ":",
        value: ((info.disk.total - info.disk.available) / 1024 / 1024 / 1024).toFixed(1),
      },
      {name: intl.formatMessage({id: 'left'}) + ":", value: (info.disk.available / 1024 / 1024 / 1024).toFixed(1)},
    ];
    if (!diskChart) {
      const diskChartNow = buildSimplePie(diskDiv, diskDataList);
      setDiskChart(diskChartNow);
    } else {
      const option = diskChart.getOption();
      option.series = [
        {
          type: 'pie',
          label: {position: 'outer', overflow: 'break', formatter: '{b}{c}GB-{d}%'},
          data: diskDataList,
        },
      ];
      diskChart.setOption(option);
    }
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderTraceChart = (traceMap: any) => {
    const traceDiv = document.getElementById(DIV_TRACE);
    const dataList: any = [];
    Object.keys(traceMap).forEach((key) => {
      const costHour = traceMap[key] / 1000 / 3600;
      dataList.push([costHour.toFixed(1), key]);
    });
    buildBarForTrace(traceDiv, dataList);
  };

  const renderCharts = () => {
    if (!systemInfo) {
      return;
    }

    renderCpuChart(systemInfo);
    renderMemChart(systemInfo);
    renderDiskChart(systemInfo);
  };

  const fetchGlobalDailyStat = async (date: string) => {
    try {
      setLoading(true);
      const result = await statService.getGlobalDailyStat(date);
      setGlobalStat(result.data);
      // renderTraceChart(result.data.statMap.Trace);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalDailyStat(selectedDate.format(DATE_FORMAT));
    init();
  }, []);

  useEffect(() => {
    renderCharts();
  }, [systemInfo]);

  const doGlobalDailyStat = () => {
    if (selectedDate) {
      statService.doStatGlobalDaily(selectedDate.format(DATE_FORMAT));
    }
  };

  const onDateSelected = async (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    fetchGlobalDailyStat(date.format(DATE_FORMAT));
  };

  const transToGB = (num: number | undefined) => {
    if (!num) {
      return '0GB';
    }
    return (num / 1024 / 1024 / 1024).toFixed(1) + 'GB';
  };

  return <Spin spinning={loading}>
    <Row gutter={[5, 5]}>
      <Col span={24}>
        <Tag color="black">
          <SolutionOutlined/> <FormattedMessage id={'commonlyUsedWebsites'}/>:
        </Tag>
        <Tag color="#108ee9">
          <SolutionOutlined/> {HMDB}
        </Tag>
        <Tag color="#108ee9">
          <GlobalOutlined/> {KEGG}
        </Tag>
        <Tag color="#108ee9">
          <IdcardOutlined/> {MassBank}
        </Tag>
        <Tag color="#108ee9">
          <MacCommandOutlined/> {GNPS}
        </Tag>
        <Tag color="#f50">
          <FileZipOutlined/> {AirdPro}
        </Tag>
        <Tag color="#f50">
          <FileZipOutlined/> {AirdSDK}
        </Tag>
        <Tag color="#f50">
          <FileZipOutlined/> {MSNET3D}
        </Tag>
        <Tag color="#87d068">
          <InteractionOutlined/> {Injection}
        </Tag>
      </Col>
      <Col span={14}>
        <StatisticCard.Group size={'small'} title={<FormattedMessage id={'basicStatInfo'}/>}>
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'projects'}/>,
              value: globalStat?.statMap.ProjectNum,
              icon: <img style={imgStyle} src="/icons/icon_project.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'runs'}/>,
              value: globalStat?.statMap.RunNum,
              icon: <img style={imgStyle} src="/icons/icon_run.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'libraries'}/>,
              value: globalStat?.statMap.LibraryNum,
              icon: <img style={imgStyle} src="/icons/icon_library.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'targets'}/>,
              value: globalStat?.statMap.TargetNum,
              icon: <img style={imgStyle} src="/icons/icon_target.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'spectra'}/>,
              value: globalStat?.statMap.SpectraNum,
              icon: <img style={imgStyle} src="/icons/icon_spectrum.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'overviews'}/>,
              value: globalStat?.statMap.OverviewNum,
              icon: <img style={imgStyle} src="/icons/icon_overview.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'traces'}/>,
              value: globalStat?.statMap.TraceTotalNum,
              icon: <img style={imgStyle} src="/icons/icon_trace.png"/>,
            }}
          />
        </StatisticCard.Group>
      </Col>
      <Col span={10}>
        <StatisticCard.Group size={'small'} title={<FormattedMessage id={'manualCheckStat'}/>}>
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'checkConfirm'}/>,
              value:
                globalStat?.statMap.Check4Target > 10000
                  ? (globalStat?.statMap.Check4Target / 10000).toFixed(2)
                  : globalStat?.statMap.Check4Target,
              suffix: globalStat?.statMap.Check4Target > 10000 ? <FormattedMessage id={'million'}/> : '',
              icon: <img style={imgStyle} src="/icons/icon_check_for_target.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'paramsCalibra'}/>,
              value: globalStat?.statMap.BaseParamsUpdate,
              suffix: '',
              icon: <img style={imgStyle} src="/icons/icon_base_params_update.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'runAdjust'}/>,
              value: globalStat?.statMap.Update4Run,
              suffix: '',
              icon: <img style={imgStyle} src="/icons/icon_update_for_run.png"/>,
            }}
          />
          <StatisticCard
            statistic={{
              title: <FormattedMessage id={'manualIntegral'}/>,
              value: globalStat?.statMap.ManualIntegration,
              suffix: '',
              icon: <img style={imgStyle} src="/icons/icon_manual_integration.png"/>,
            }}
          />
        </StatisticCard.Group>
      </Col>
      <Col span={19}>
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Row gutter={[5, 5]}>
              <Col span={24}>
                <Card size={'small'} title={<FormattedMessage id={'systemInfo'}/>}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Descriptions size={'small'} bordered column={4}>
                        <Descriptions.Item label="OS">
                          {systemInfo?.env.osName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">
                          {systemInfo?.env.computerName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Local IP">
                          {systemInfo?.env.localIp}
                        </Descriptions.Item>
                        <Descriptions.Item label="Java">
                          {'Java:' + systemInfo?.env.javaVersion + ', ' + systemInfo?.env.javaVendor}
                        </Descriptions.Item>
                        <Descriptions.Item label="Zone">{systemInfo?.env.timezone}</Descriptions.Item>
                        <Descriptions.Item label="Memory">
                          {transToGB(systemInfo?.mem.totalMem)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Max JVM">
                          {transToGB(systemInfo?.mem.jvmMaxMem)}
                        </Descriptions.Item>
                        <Descriptions.Item label={<FormattedMessage id={'repository'}/>}>
                          {systemInfo?.disk.path}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={8}>
                      <Card size={'small'} title={'CPU'}>
                        <div id={DIV_CPU} style={{height: 160, width: 'auto'}}/>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        size={'small'}
                        title={'Memory: ' + transToGB(systemInfo?.mem.totalMem)}
                      >
                        <div id={DIV_MEM} style={{height: 160, width: 'auto'}}/>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card size={'small'} title={'Disk, Repo:  ' + systemInfo?.disk.path}>
                        <div id={DIV_DISK} style={{height: 160, width: 'auto'}}/>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={24}>
                <Card size={'small'} title={<FormattedMessage id={'traceList'}/>}>
                  <ProTable<Trace, Pagination>
                    actionRef={tableRef}
                    scroll={{x: 'max-content'}}
                    headerTitle={<FormattedMessage id={'traceList'}/>}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    pagination={{
                      pageSize: 5
                    }}
                    search={false}
                    toolBarRender={false}
                    request={doList}
                    columns={buildColumn()}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          {/*<Col span={6}>*/}
          {/*  <Card size={'small'} title={<FormattedMessage id={'traceTimeStat'}/>}>*/}
          {/*    <div id={DIV_TRACE} style={{height: 650, width: 'auto'}}/>*/}
          {/*  </Card>*/}
          {/*</Col>*/}
        </Row>
      </Col>
      <Col span={5}>
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Card size={'small'} title={<FormattedMessage id={'vendorSupport'}/>}>
              <Row gutter={[0, 15]}>
                <Col span={12}>
                  <img height={30} src={'/img/Sciex.jpg'}/>
                </Col>
                <Col span={12}>
                  <img height={25} src={'/img/Thermo.webp'}/>
                </Col>
                <Col span={12}>
                  <img height={40} src={'/img/Agilent.png'}/>
                </Col>
                <Col span={12}>
                  <img height={40} src={'/img/Bruker.svg'}/>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card size={'small'} title={<FormattedMessage id={'statCalendar'}/>}
                  extra={<Button onClick={doGlobalDailyStat}><FormattedMessage id={'statSelectDay'}/></Button>}>
              <Calendar fullscreen={false} onSelect={onDateSelected}/>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Spin>
}

export default Index;
