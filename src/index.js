import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './style/lib/animate.css';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'; 
import Page from './components/Page'; 
import Login from './components/pages/Login'; 
import SignUp from './components/pages/SignUp'; 
import NotFound from './components/pages/NotFound'; 

import Hiring from './components/hiring/Hiring'; 
import TemplateTable from './components/hiring/TemplateTable';
import HiringOrderForm from './components/hiring/OrderForm'; 
import HiringOrderList from './components/hiring/OrderList'; 
import ScheduleInterview from './components/hiring/ScheduleInterview'; 
import HiringOrderDetail from './components/hiring/OrderDetail'; 
import HiringWorkerList from './components/hiring/WorkerList'; 
import HiringWorkerDetail from './components/hiring/WorkerDetail';
import HiringEmployForm from './components/hiring/EmployForm';     
import HiringEmployDetail from './components/hiring/EmployDetail';   
import HiringEmployList from './components/hiring/EmployList';   

import Supplier from './components/suppliers/Supplier'; 
import SupplierOrderList from './components/suppliers/OrderList'; 
import WorkerForm from './components/suppliers/WorkerForm'; 
import SupplierWorkerList from './components/suppliers/WorkerList';  
import SupplierWorkerDetail from './components/suppliers/WorkerDetail'; 
import SupplierOrdersDetail from './components/suppliers/OrdersDetail'; 
import SupplierEmployList from './components/suppliers/EmployList'; 
import SupplierEmployDetail from './components/suppliers/EmployDetail'; 

import AdviserSignUpForm from './components/adviser/SignUpForm'; 

import Report from './components/report/Report'; 
import Dashboard from './components/pages/Dashboard'; 
import Reports from './components/pages/Reports';  
import Apps from './components/pages/Apps'; 
import SDKDoc from './components/pages/SDKDoc'; 

const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('./components/ui/Wysiwyg').default);
    }, 'Wysiwyg');
};

const routes =
    
    <Route path={'/'} components={Page}>hiring/TemplateTable
        <Route path={'/'} components={App}>
            <IndexRedirect to="/dashboard" /> 
            <Route path={'hiring'}> 
                //用人单位创建订单
                <Route path={'orderform'} component={HiringOrderForm} />  
                <Route path={'index'} component={Hiring} /> 
                //用人单位创建订单模板
                <Route path={'templatetable'} component={TemplateTable} /> 
                <Route path={'orderform/:id'} component={HiringOrderForm} />  
                //用人单位订单列表
                <Route path={'orderlist'} component={HiringOrderList} />
                //用人单位订单详情
                <Route path={'orderdetail/:id'} component={HiringOrderDetail} />
                //TODO:3 用人单位收到的人的列表
                <Route path={'workerlist'} component={HiringWorkerList} />
                //TODO:4 详情里有打分用人单位看外服公司员工订单详情 
                <Route path={'workerdetail/:id'} component={HiringWorkerDetail} />    
                //用人单位看外服公司员工订单详情面试
                <Route path={'interview'} component={ScheduleInterview} />
                //TODO:5 用人单位雇用表单
                <Route path={'employform/:id'} component={HiringEmployForm} />
                //TODO:6 用人合同表格
                <Route path={'employlist'} component={HiringEmployList} />
                //TODO:6 用人合同详情
                <Route path={'employdetail/:id'} component={HiringEmployDetail} />
            </Route>  
            <Route path={'supplier'}> 
                <Route path={'index'} component={Supplier} /> 
                //TODO:外服公司订单列表   
                <Route path={'orderlist'} component={SupplierOrderList} /> 
                //外服公司员工订单
                <Route path={'orderdetail/:id'} component={SupplierOrdersDetail} />   
                //TODO:1.外服公司上传的人的价格添加   外服公司创建员工订单  
                <Route path={'workerform/:id'} component={WorkerForm} />   
                //TODO:2 外服公司上传的人的列表
                <Route path={'workerlist'} component={SupplierWorkerList} /> 
                //外服公司员工详情 
                <Route path={'workerdetail/:id'} component={SupplierWorkerDetail} /> 
                //TODO:4 用人单位 人详情
                {/*<Route path={''} component={} />*/}

                //TODO:7 外服公司收到用人回执 表格 EmployList
                <Route path={'employlist'} component={SupplierEmployList} />
                //TODO:7 外服公司收到用人回执 详情表单 ➕
                <Route path={'employdetail/:id'} component={SupplierEmployDetail} />
                //TODO:8 自由顾问注册
                //TODO:9 可有可无 自由顾问 工作列表
                {/*<Route path={''} component={} />*/}
            </Route>  

            <Route path={'adviser'}>  
                //TODO:8 自由顾问注册
                <Route path={'signup'} component={AdviserSignUpForm} />
                //TODO:9 可有可无 自由顾问 工作列表
                {/*<Route path={''} component={} />*/}
            </Route> 


            <Route path={'report'}> 
                <Route path={'index'} component={Report} />  
            </Route>  
            <Route path={'dashboard'} components={Dashboard} />  
            <Route path={'reports'} components={Reports} />  
            <Route path={'apps'} components={Apps} />  
            <Route path={'sdkdoc'} components={SDKDoc} />  
        </Route>
        <Route path={'login'} components={Login} />
        <Route path={'404'} component={NotFound} />
        <Route path={'signup'} component={SignUp} />
    </Route>;


ReactDOM.render(
  <Router history={hashHistory}>
      {routes}
  </Router>,
  document.getElementById('root')
);
