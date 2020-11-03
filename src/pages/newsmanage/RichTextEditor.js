/*
用来指定文章详情的富文本编辑器组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { BASE_IMG_URL } from '../../utils/constants'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'


export default class RichTextEditor extends Component {

    static propTypes = {
        detail: PropTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
    }

    constructor(props) {
        super(props)
        const html = this.props.detail
        if (html) { // 如果有值, 根据html格式字符串创建一个对应的编辑对象
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
            }
        }

    }

    /*
    输入过程中实时的回调
     */
    onEditorStateChange = (editorState) => {
        console.log('onEditorStateChange()')
        this.setState({
            editorState,
        })
    }

    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallBack = (file) => {
        console.log(file)
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/articlesImg/uploads')
                const data = new FormData()

                data.append('article-img', file)
                xhr.send(data)
                console.log(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    console.log(response)
                    const url = BASE_IMG_URL + response.data.name // 得到图片的url
                    // console.log(url)
                    resolve({ data: { link: url } })
                })
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                })
            }
        )
    }

    render() {
        const { editorState } = this.state
        return (
            <Editor
                inline={false}
                editorState={editorState}
                editorStyle={{ border: '1px solid black', minHeight: 200, paddingLeft: 10 }}
                onEditorStateChange={this.onEditorStateChange}
                editorClassName="zgw-editor"
                // toolbarClassName="toolbarClassName"
                placeholder="请输文章内容"
                spellCheck
                localization={{ locale: 'zh', translations: { 'generic.add': '添加' } }}
                toolbar={{
                    fontFamily: {
                        options: ['宋体', '仿宋', '黑体', '楷体', '微软雅黑',
                            'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana',]
                    },
                    history: { inDropdown: true },
                    image: {
                        alignmentEnabled: true,
                        uploadCallback: this.uploadImageCallBack,
                        alt: { present: false, mandatory: false },
                        inputAccept: 'image/*',
                        defaultSize: {
                            height: '400px',
                            width: '600px',
                        },
                    },
                }}
            />
        )
    }
}