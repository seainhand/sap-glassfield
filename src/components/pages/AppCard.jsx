
/**
 * Created by lixiang on 2017/7/17.
 */
import React, { Component } from 'react'; 
import { Card, Avatar, Select, Icon, Tooltip, Input, Form, Button} from 'antd'; 
const Option = Select.Option;
const FormItem = Form.Item;
import '../../style/pages/Apps.less';
 
 
class AppCard extends Component {
  state = {
    edit: false,
    loading: false
  };
  editOid = () => {
    this.setState({
      edit: true
    })
  };
  editComplete = (e) => {
    this.setState({
      // edit: false,
      loading: true
    })
  };
  addOid = (e) => {
    console.log(e)
  };
  deleteOid = (e) => {
    console.log(e)
  };
  cancel = () => {
    this.setState({
      edit: false,
      loading: false
    })
  };
  render() {    
    return ( 
          <Card className="app-card" bordered={false}  style={{minHeight: "170px", width: "900px", margin: "10px auto"}}> 
            <Avatar className="app-avatar" shape="square" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <h2 className="app-title">
              title
              <Tooltip placement="right" title={( <div><div>Appkey: 123123123123123123</div><div>Secret key: 123</div> </div>)} arrowPointAtCenter>
                <span className="app-key">key<Icon className="app-key-down" type="down" /></span>
              </Tooltip>
            </h2>
            
            
            <h3 className="revenue">Revenue: 18888888</h3>
            <Select className="app-select" defaultValue="Zhejiang" size="small">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>

            <Form layout="inline" style={{marginTop: "10px"}}> 
              <FormItem
                label="Oid" 
                 style={{width: "178px"}}
              >
                <Input disabled={!this.state.edit} placeholder="input placeholder" size="small" style={{width: "126px"}}/>
                { this.state.edit && <Icon type="delete" style={{marginLeft: "5px"}} onClick={this.deleteOid()}/>}
              </FormItem>
              <FormItem
                label="Oid" 
                 style={{width: "178px"}}
              >
                <Input disabled={!this.state.edit} placeholder="input placeholder" size="small" style={{width: "126px"}}/>
                { this.state.edit && <Icon type="delete" style={{marginLeft: "5px"}} onClick={this.deleteOid()}/>}
              </FormItem>
              <FormItem
                label="Oid" 
                 style={{width: "178px"}}
              >
                <Input disabled={!this.state.edit} placeholder="input placeholder" size="small" style={{width: "126px"}}/>
                { this.state.edit && <Icon type="delete" style={{marginLeft: "5px"}} onClick={this.deleteOid()}/>}
              </FormItem>
              <FormItem
                label="Oid" 
                 style={{width: "178px"}}
              >
                <Input disabled={!this.state.edit} placeholder="input placeholder" size="small" style={{width: "126px"}}/>
                { this.state.edit && <Icon type="delete" style={{marginLeft: "5px"}} onClick={this.deleteOid()}/>}
              </FormItem>

            </Form> 
            <section style={{marginTop: "10px"}}>
            {
              this.state.edit && <Button 
                                  size="small" 
                                  type="primary" 
                                  onClick={this.editComplete} 
                                  loading={this.state.loading}
                                 >
                                  complete
                                 </Button>
            }
            { !this.state.edit && <Button size="small" type="primary" onClick={this.editOid}>edit</Button> } 

            { this.state.edit && <Button size="small" type="" onClick={this.cancel}>cancel</Button> }
            { !this.state.edit && <Button size="small" type="primary" onClick={this.addOid}>add</Button> } 
            
            </section>
          </Card> 
        )
  };
} 

export default AppCard;