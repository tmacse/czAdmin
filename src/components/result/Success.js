import React,{Component} from 'react';
import { Result, Button } from 'antd';
import {Link} from 'react-router-dom'

class Success extends Component {
    
    render(){
        // const { title} = this.props.location.state.article
       
        return(
            <Result
              
                status="success"
                title="投递完毕!"
                subTitle="."
                extra={[
                    <Link key='1' to='/'><Button type="primary" >回到首页</Button></Link>,
                    // <Link key={{title}+1} to='/writenews'><Button >继续写文章</Button></Link>,
                    // <Button onClick={this.props.history.push('/article/detail', { article })}>{title}</Button>
                ]}
            />
        )
    }
}
export default Success;
