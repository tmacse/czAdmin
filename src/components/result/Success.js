import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom'

const Success = () => {


    return (
        <Result
            status="success"
            title="投递完毕!"
            subTitle="."
            extra={[
                <Link key='1' to='/'><Button type="primary" >回到首页</Button></Link>,
            ]}
        />
    )
}

export default Success;
