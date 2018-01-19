
/**
 * Created by lixiang on 2017/7/18.
 */
import React, { Component } from 'react'; 
import { Row, Col, Card, Icon, Table, Dropdown, Button, Menu, message} from 'antd'; 
  
function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
 
class SDKDoc extends Component { 
  render() {  
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><a href="/publisher/download-sdk?src=koala_ad_v4.6.jar" style={{color:"rgba(72,141,251,1)"}}>koala_ad_v4.6</a></Menu.Item> 
      </Menu>
    );

    return (
        <div className="gutter-example"> 
          <div className="gutter-box">  
            <Card title="SDK DOC" bordered={false}  style={{minHeight: "170px", marginTop: "10px"}}> 
              <Dropdown overlay={menu} trigger={['click']}>
                <Button style={{ marginLeft: 8 }}>
                  Download SDK <Icon type="down" />
                </Button>
              </Dropdown>
              <a href="https://github.com/leotse90/KoalaAdDemoApp" style={{color:"rgba(72,141,251,1)", marginTop:"20px" ,display: "block"}}>[DOC] Integration Document</a>
            </Card>
          </div>
        </div>
        )
  };
} 

export default SDKDoc;