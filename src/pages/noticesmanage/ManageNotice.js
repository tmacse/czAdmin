import React from 'react';
import { reqNotices, reqDeleteNotice, reqSearchNotices } from '../../api'
import Manage from '../bookfile/Manage';


const ManageNotice = (props) => {
    return (
        <Manage
            {...props}
            reqMessage={reqNotices}
            reqDeleteMessage={reqDeleteNotice}
            reqSearchMessage={reqSearchNotices}
            toDetail={'/notice/detail'}
            toChange={'notice/write'}
        />
    )
}

export default ManageNotice;