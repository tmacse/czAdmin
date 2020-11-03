import React, {Component} from 'react'
import { Card} from 'antd'
import {reqGetLvzhiArticles,reqGetChangzhanArticles,reqGetJiwuArticles,reqGetKongqinArticles} from '../../api'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'
import TimePicker from '../charts/TimePicker'


/*
后台管理的饼图路由组件
 */
export default class Pie extends Component {
  state = {
    totalLvzhiArticles: 0,
    totalChangzhanArticles: 0,
    totalKongqinArticles: 0,
    totalJiwuArticles: 0,
    startTime: moment().subtract(30, 'days').toJSON(),
    endTime: moment().toJSON()
  }
  
  //获取lvzhi新闻总数,直接显示到页面首页上
  getTotalLvzhi = async () => {
    let result
    result = await reqGetLvzhiArticles()
    // console.log(result)
    if (result.status === 0) {
      const { totalLvzhiArticles } = result
      this.setState({
        totalLvzhiArticles
      })
    }
  }
  getTotalChangzhan = async () => {
    let result
    result = await reqGetChangzhanArticles()
    // console.log(result)
    if (result.status === 0) {
      const { totalChangzhanArticles } = result
      this.setState({
        totalChangzhanArticles
      })
    }
  }
  getTotalJiwu = async () => {
    let result
    result = await reqGetJiwuArticles()
    // console.log(result)
    if (result.status === 0) {
      const { totalJiwuArticles } = result
      this.setState({
        totalJiwuArticles
      })
    }
  }
  getTotalKongqin = async () => {
    let result
    result = await reqGetKongqinArticles()
    // console.log(result)
    if (result.status === 0) {
      const { totalKongqinArticles } = result
      this.setState({
        totalKongqinArticles
      })
    }
  }
  getOption = () => {
    const {
      totalLvzhiArticles,
      totalKongqinArticles,
      totalChangzhanArticles,
      totalJiwuArticles,
    } = this.state
    return {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['旅直','空勤','机务大队','南充场站']
      },
      series : [
        {
          name: '新闻来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            { value: totalLvzhiArticles, name:'旅直'},
            {value:totalKongqinArticles, name:'空勤'},
            { value: totalJiwuArticles, name:'机务大队'},
            { value:  totalChangzhanArticles, name:'南充场站'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }

 
componentDidMount(){
this.getTotalLvzhi()
this.getTotalKongqin()
this.getTotalJiwu()
this.getTotalChangzhan()
}
  render() {
    
 
    // const dateFormat = 'YYYY/MM/DD';
    return (
      <div>
        <Card 
          title='新闻后台分析'
          style={{width:'100%'}}
          extra={<TimePicker/>}
          >
          <ReactEcharts option={this.getOption()} style={{height: 200,width:400}}/>
        </Card>
      </div>
    )
  }
}
