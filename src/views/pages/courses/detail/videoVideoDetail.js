import React, { useEffect, useState, useRef } from 'react'
import { Avatar, Button, Col, Divider, Layout, List, Menu, Progress, Row } from 'antd'
import ReactHlsPlayer from 'react-hls-player'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import CourseDetailModuleCollapse from 'src/views/pages/courses/detail/CollapseModule'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const VideoDetail = () => {
  const playerRef = useRef(null)

  const modules = [
    {
      name: 'Module 01: Nhập Môn',
      lessons: [
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
      ],
    },
  ]
  return (
    <div className="form-container">
      <Row>
        <Col span={18}>
          <ReactHlsPlayer
            src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            hlsConfig={{
              maxLoadingDelay: 4,
              minAutoBitrate: 0,
              lowLatencyMode: true,
            }}
            playerRef={playerRef} // Assign the ref to playerRef
            width="100%"
            height="auto"
            controls // Optional: Add controls for play, pause, etc.
          />
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: {
                items: ['undo', 'redo', '|', 'bold', 'italic'],
              },
              initialData: '<p>Hello from CKEditor 5 in React!</p>',
            }}
          />
        </Col>
        <Col span={6}>
          <CCard className={'border-light left-menu-video'}>
            <CCardBody className="d-grid gap-2">
              <CCardTitle>
                <strong>Bài Học</strong>
              </CCardTitle>

              {modules.map((module, index) => (
                <CourseDetailModuleCollapse key={index} module={module} />
              ))}
            </CCardBody>
          </CCard>
        </Col>
      </Row>
    </div>
  )
}

export default VideoDetail
