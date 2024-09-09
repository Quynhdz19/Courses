import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { Col, Row } from 'antd'
import React, { useRef, useEffect, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import CourseDetailModuleCollapse from 'src/views/pages/courses/detail/CollapseModule'
import './videoVideoDetail.css'
import CourseService from 'src/services/CourseService'
import { useNavigate, useParams } from 'react-router-dom'

const VideoDetail = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)

  const playerRef = useRef(null)

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      console.log(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [])

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
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
      ],
    },
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
    <div className="video-card">
      <Row gutter={16}>
        <Col span={16}>
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
        <Col span={8}>
          <CCard className="border-light overflow-auto">
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
