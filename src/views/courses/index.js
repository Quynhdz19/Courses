import React, { useEffect, useState, createRef } from 'react'
import { Avatar, Button, Card, Carousel } from 'antd'
import { useNavigate } from 'react-router-dom'
import Meta from 'antd/es/card/Meta'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CRow,
} from '@coreui/react'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'

import '/src/css/courses-index.css';
const CoursesList = () => {
  const navigate = useNavigate()

  const tableExample = [
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      image: { src: avatar1, status: 'success' },
      title: ' Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
  ]

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const handleClick = () => {
    navigate('/course-detail')
  }
  return (
    <div>
      <Carousel arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tableExample.map((item, index) => (
          <CCard v-for="item in tableItems" key={index} className="m-lg-3">
            <CCardImage size="md" src={item.image.src} status={item.image.status} />
            <CCardTitle>
              <span className='m-lg-2'>{item.title}</span>
            </CCardTitle>
            <CCardText>
              <ins className='m-lg-2'>{item.price}</ins>
            </CCardText>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CAvatar className="m-lg-1" size="md" src={item.avtar.src} status={item.avtar.status} />
              <CCardText>
                <div className="text-center m-lg-2">{item.name}</div>
              </CCardText>
              <CCardText>
                <div className="text-center m-lg-2">{item.lecture}</div>
              </CCardText>
            </div>
          </CCard>
        ))}
      </div>
    </div>
  )
}

export default CoursesList
