import React from 'react'
import { Upload, Icon } from 'antd'
// 引入编辑器组件
import PropTypes from 'prop-types'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { BASE_IMG_URL } from '../../utils/constants'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'

export default class EditorDemo extends React.Component {
    static propTypes = {
        detail: PropTypes.string
    }

    // state = {
    //     // 创建一个空的editorState作为初始值
    //     editorState: BraftEditor.createEditorState(null)
    // }
    constructor(props) {
        super(props)
        const html = this.props.detail
        if (html) { // 如果有值, 根据html格式字符串创建一个对应的编辑对象

            const editorState = BraftEditor.createEditorState(html)
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                // editorState: BraftEditor.createEmpty(), // 创建一个没有内容的编辑对象
                editorState: BraftEditor.createEditorState(null)
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
    preview = () => {

        if (window.previewWindow) {
            window.previewWindow.close()
        }

        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()

    }
    buildPreviewHtml() {

        return `
      <!Doctype html>
      <html>
        <head>
          <title>文章预览界面</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container braft-output-content">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

    }
    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        // return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        return this.state.editorState.toHTML()
    }


    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    uploadImageCallBack = (file) => {
        console.log(file.file.name, file.file.type)
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/articlesImg/uploads')
                const data = new FormData()
                console.log(file)
                data.append('article-img', file.file)
                xhr.send(data)
                console.log(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    // const response = xhr.responseText
                    console.log(response)
                    const url = BASE_IMG_URL + response.data.name // 得到图片的url
                    console.log(url)
                    const editorState = ContentUtils.insertMedias(this.state.editorState, [
                        {
                            type: 'IMAGE',
                            url: url,
                        }
                    ])
                    this.setState({ editorState })
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
        const imageControls = [
            'align-center',
            'size',
            'remove'
        ]
        const { editorState } = this.state;
        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        customRequest={this.uploadImageCallBack}
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </Upload>
                )
            },
            {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }
        ];
        return (
            <div>
                <BraftEditor
                    excludeControls={['media']}
                    contentStyle={{ minHeight: 600, fontSize: '16px', lineHeight: '0px' }}
                    value={editorState}
                    onChange={this.handleEditorChange}
                    extendControls={extendControls}
                    imageControls={imageControls}
                />
            </div>
        )

    }
}

