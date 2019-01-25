import React from "react";
import ReactDOM from "react-dom";
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.min.css'
import './index.less'
import ReactEcharts from 'echarts-for-react';

class AchieveProperty extends React.Component {
  state = {
    name: 'you name'
  }
  getOption = () => {
    let option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    };
    return option
  }
  render () {
    return <div>
      {this.state.name}
      <div id="main"></div>
      <Button type="danger">Primary</Button>
      <ReactEcharts option={this.getOption()} />
    </div>
  }
}

const Index = () => {
  return <div>
    <div className="center" style={{"color": "yellow"}}>
      <div className="title1">title1</div>
      <div className="title2">title2</div>
    </div>
    <Row>
      <Col span={12}>
        <Button type="danger">Primary 2</Button>
      </Col>
      <Col span={12}>
        <Button type="danger">Primary</Button>
      </Col>
    </Row>
    <img src={require('./1.jpeg')} />
    <AchieveProperty></AchieveProperty>
  </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));