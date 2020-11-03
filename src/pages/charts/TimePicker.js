import React,{Component} from 'react'
// import moment from 'moment'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;


export default class TimePicker extends Component{
    state = {
        mode: ['month', 'month'],
        value: [],
    };

    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
        });
    };

    handleChange = value => {
        this.setState({ value });
    };
    render(){
        const { value, mode } = this.state;
      
        // value.map((item) => {
        //     console.log(item._d)
        // })
        return (
            <RangePicker
                placeholder={['Start month', 'End month']}
                format="YYYY-MM"
                value={value}
                mode={mode}
                onChange={this.handleChange}
                onPanelChange={this.handlePanelChange}
            />
        );
    }
}