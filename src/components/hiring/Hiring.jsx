
/**
 * Created by lixiang on 2017/7/16.
 */
import React, { Component } from 'react'; 
import { Row, Col, Card, Icon ,Table } from 'antd';
import ReactEcharts from 'echarts-for-react'; 
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
 

//将类似"2013-08-30"的日期转化为时间戳
function dateToStamp(str) { 
  str = str.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
  var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
  var stamp = date.getTime();
  return stamp;
}


const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


const tableData = [{
  key: '1',
  date: '2017-4-13',
  requests: 123156,
  fills: 9932,
  impressions: 32,
  clicks: 565646,
  revenues: 9932,
  ctr: 32.55,
  ecpm: 0.32
}, {
  key: '2',
  date: '2016-4-13',
  requests: 123156,
  fills: 9932,
  impressions: 32,
  clicks: 565646,
  revenues: 92932,
  ctr: 32.55,
  ecpm: 0.32
}, {
  key: '3',
  date: '2017-2-13',
  requests: 123156,
  fills: 9932,
  impressions: 32,
  clicks: 565646,
  revenues: 19932,
  ctr: 32.55,
  ecpm: 0.32
}];

class Hiring extends Component {
  state = {
    //图表配置
    option : { 
      title: {
          text: '折线图堆叠'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value'
      },
      toolbox: {
          show: false
      },
      series: [
          {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
      ]
    }
  };
  render() { 
    //表格列配置
    const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dateToStamp(a.date) - dateToStamp(b.date),
    }, {
      title: 'Requests',
      dataIndex: 'requests',
      key: 'requests',
    }, {
      title: 'Fills',
      dataIndex: 'fills',
      key: 'fills',
    }, {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions',
    }, {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
    }, {
      title: 'Revenues',
      dataIndex: 'revenues',
      key: 'revenues',
      sorter: (a, b) => a.revenues - b.revenues,
    }, {
      title: 'ctr',
      dataIndex: 'ctr',
      key: 'ctr',
    }, {
      title: 'Ecpm',
      dataIndex: 'ecpm',
      key: 'ecpm',
    }]; 
    return (
        <div className="gutter-example"> 
          <div className="gutter-box"> 
            {/*上面的卡片*/}
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false} style={{minHeight: "170px"}}>
                 <Row type="flex" justify="space-around" gutter={16} align="bottom">
                    <Col span={12} style={{textAlign: "center"}}>
                      <h2>Today</h2> 
                    </Col>
                    <Col span={12} style={{textAlign: "center"}}>
                      <h3>Revenue</h3>
                    </Col> 
                  </Row>
                  <Row type="flex" justify="space-around" style={{marginTop: "60px"}}>
                      <h1>$53.42</h1>
                  </Row> 
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{minHeight: "170px", background: "#c7dcff"}}>
                 <Row type="flex" justify="space-around" gutter={16} align="bottom">
                    <Col span={12} style={{textAlign: "center"}}>
                      <h2>Today</h2> 
                    </Col>
                    <Col span={12} style={{textAlign: "center"}}>
                      <h3>Revenue</h3>
                    </Col> 
                  </Row>
                  <Row type="flex" justify="space-around" style={{marginTop: "60px"}}>
                      <h1>$53.42</h1>
                  </Row> 
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{minHeight: "170px"}}>
                 <Row type="flex" justify="space-around" gutter={16} align="bottom">
                    <Col span={12} style={{textAlign: "center"}}>
                      <h2>Today</h2> 
                    </Col>
                    <Col span={12} style={{textAlign: "center"}}>
                      <h3>Revenue</h3>
                    </Col> 
                  </Row>
                  <Row type="flex" justify="space-around" style={{marginTop: "60px"}}>
                      <h1>$53.42</h1>
                  </Row> 
                </Card>
              </Col> 
            </Row> 
            <Card title="Last 7 Day Revenue" bordered={false} style={{minHeight: "170px", marginTop: "10px"}}>
            {/*图表*/}
            <ReactEcharts
                option={this.state.option}
                style={{height: '300px', width: '100%'}}
                className={'react_for_echarts'}
            />
            </Card> 
            {/*表格*/}
            <Card title="Showing 1-7 of 7 items." bordered={false}  style={{minHeight: "170px", marginTop: "10px"}}>
                <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={tableData} />
            </Card>
          </div>
        </div>
        )
  };
} 

export default Hiring;