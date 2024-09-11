import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { Col, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import { useParams } from 'react-router-dom'
import CourseService from 'src/services/CourseService'
import CourseDetailModuleCollapse from '../../components/courses/detail/CollapseModule'
import './LessonPage.scss'

const LessonPage = () => {
  const { courseId, lessonId } = useParams()
  const [course, setCourse] = useState({})
  const [lesson, setLesson] = useState({})

  const playerRef = useRef(null)

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      setCourse(response)
      setLesson(findCurrentLessonInModules(response.modules, lessonId))
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const findCurrentLessonInModules = (modules, lessonId) => {
    return modules
      .reduce((flattenedArray, module) => flattenedArray.concat(module.lessons), [])
      .find((lesson) => lesson._id === lessonId)
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return (
    <div className="video-card">
      <h3>Bài học: {lesson.title}</h3>
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
              {course.modules?.map((module) => (
                <CourseDetailModuleCollapse key={module._id} module={module} />
              ))}
            </CCardBody>
          </CCard>
        </Col>
      </Row>
    </div>
  )
}

export default LessonPage
