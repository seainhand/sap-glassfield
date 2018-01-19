
/**
 * Created by lixiang on 2017/7/17.
 */
import React, { Component } from 'react'; 
import { Row, Col, Card, Avatar, Select, Icon, Tooltip, Input, Form, Button} from 'antd'; 
import AppCard from './AppCard'; 
const Option = Select.Option;
const FormItem = Form.Item;
import '../../style/pages/Apps.less';
 
 
class Apps extends Component {
  render() {    
    return (
        <div className="gutter-example"> 
          <div className="gutter-box">   
            <AppCard />
            <AppCard />
          </div>
        </div>
        )
  };
} 

export default Apps;