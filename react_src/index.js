import React from "react";
import ReactDOM from "react-dom";
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.min.css'
import './index.less'

const Index = () => {
  return <div>
    <div className="center" style={{"color": "yellow"}}>Hello React First!</div>
    <Row>
      <Col span={12}>
        <Button type="danger">Primary 2</Button>
      </Col>
      <Col span={12}>
        <Button type="danger">Primary</Button>
      </Col>
    </Row>
    <img src={require('./1.jpeg')} />
  </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));