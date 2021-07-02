import React from 'react';
import { reqCheckedArticles, reqDeleteArticle, reqCheckedSearchArticles } from '../../api'
import Manage from '../bookfile/Manage';

const ManageNews = (props) => {
    return (
        <Manage
            {...props}
            reqMessage={reqCheckedArticles}
            reqDeleteMessage={reqDeleteArticle}
            reqSearchMessage={reqCheckedSearchArticles}
            toDetail={'/article/detail'}
            toChange={'/writenews'}
        />
    )
}
export default ManageNews;