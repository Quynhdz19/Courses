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
  CCardTitle, CImage,
  CRow
} from "@coreui/react";
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

// import '/src/css/courses-index.css';
const CoursesList = () => {
  const navigate = useNavigate()

  const imgCaroucel = [
    {
    image: { src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1', status: 'succes'}
    }, {
      image: { src:'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',status: 'succes'}
    }, {
      image: { src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1', status: 'succes'}
    }, {
      image: { src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1', status: 'succes'}
    },
  ]
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

  const handleClick = () => {
    navigate('/course-detail')
  }
  return (
    <div>
      <Carousel arrows infinite={false}>
        {imgCaroucel.map((item, index) => (
          <div style={
            {
              width: '80%',
              display: 'flex',
              maxWidth: '100%',
              height: "auto",
            }
          }>
          <div v-for="item in tableItems" key={index}>
            <CImage src={item.image.src} status={item.image.status}/>
          </div>
            </div>
        ))}

      </Carousel>
      <CCardTitle style={{ display: 'flex', justifyContent: 'left', }}>
        <h2 className="p-lg-3">Danh sach khoa hoc</h2>
      </CCardTitle>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tableExample.map((item, index) => (
          <CCardBody className="d-grid gap-2">
          <CCard v-for="item in tableItems" key={index} className="m-lg-3">
            <CCardImage size="md" src={item.image.src} status={item.image.status} />
            <CCardTitle>
              <span className="m-lg-2">{item.title}</span>
            </CCardTitle>
            <CCardText>
              <ins className="m-lg-2 text-primary">{item.price}</ins>
            </CCardText>
            <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap'}}>
              <CAvatar
                className="m-lg-1"
                size="md"
                src={item.avtar.src}
                status={item.avtar.status}
              />
              <CCardText>
                <div className="text-center m-lg-2">{item.name}</div>
              </CCardText>
              <CCardText style={{display: 'flex', justifyContent: 'right',}}>
                <div className="text-center m-lg-2">{item.lecture}</div>
              </CCardText>
            </div>
          </CCard>
          </CCardBody>
        ))}
      </div>
    </div>
  )
}

export default CoursesList
