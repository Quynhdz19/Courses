import React, { useEffect, useState, useRef } from 'react'
import { Avatar, Button, Col, Divider, Layout, List, Menu, Progress, Row } from 'antd'
import ReactHlsPlayer from 'react-hls-player'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const VideoDetail = () => {
  const playerRef = useRef(null) // Use useRef instead of createRef

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
        </Col>
        <Col span={6}>
          <List
            size="small"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
    </div>
  )
}

export default VideoDetail
