import React, { useEffect, useState, createRef } from 'react'
import { Carousel } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CImage,
  CLink,
  CRow,
} from '@coreui/react'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'

const CoursesList = () => {
  const navigate = useNavigate()

  const imgCarousel = [
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
  ]
  const tableExamples = [
    {
      id: 10,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 11,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 12,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 12,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 12,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 12,
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
  ]

  const handleClick = () => {
    navigate('/course-detail')
  }
  return (
    <div>
      <Carousel arrows infinite={false}>
        {imgCarousel.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <div
            style={{
              width: '80%',
              display: 'flex',
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            {/* eslint-disable-next-line react/no-unknown-property */}
            <div key={index}>
              <CImage src={item.image.src} status={item.image.status} />
            </div>
          </div>
        ))}
      </Carousel>
      <CCardTitle style={{ display: 'flex', justifyContent: 'left' }}>
        <h2 className="p-lg-3">Danh Sách Khóa Học </h2>
      </CCardTitle>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tableExamples.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <CLink href={`courses-detail/${item.id}`}>
            <CCardBody className="d-grid gap-2">
              <CCard key={index} className="m-lg-3">
                <CCardImage size="md" src={item.image.src} status={item.image.status} />
                <CCardTitle>
                  <span className="m-lg-2">{item.title}</span>
                </CCardTitle>
                <CCardText>
                  <ins className="m-lg-2 text-primary">{item.price}</ins>
                </CCardText>
                <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
                  <CAvatar
                    className="m-lg-1"
                    size="md"
                    src={item.avtar.src}
                    status={item.avtar.status}
                  />
                  <CCardText>
                    <div className="text-center m-lg-2">{item.name}</div>
                  </CCardText>
                  <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
                    <div className="text-center m-lg-2">{item.lecture}</div>
                  </CCardText>
                </div>
              </CCard>
            </CCardBody>
          </CLink>
        ))}
      </div>
    </div>
  )
}

export default CoursesList
