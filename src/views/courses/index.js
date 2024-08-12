import React, { useEffect, useState, createRef } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const CoursesList = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/courses-detail')
  }
  return (
    <>
      <Button onClick={handleClick} type="primary">
        Button
      </Button>
    </>
  )
}

export default CoursesList
