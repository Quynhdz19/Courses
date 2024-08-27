import React from 'react'
import CourseDetailDescriptionCard from '../detail/CardDescription'
import CourseDetailModulesCard from '../detail/CardModules'

const CourseDetail = () => {
  const description = {
    header: 'Mô Tả',
    content:
      'Khóa học Laravel Framework trang bị cho học viên các kiến thức từ cơ bản đến nâng cao về Laravel Framework, từ đó giúp học viên tự làm dự án với PHP Framework này.\nNgoài ra, học viên được rèn luyện tư duy khi làm việc với Framework từ đó có thể triển khai các dự án phức tạp, có tính logic cao.\nKhóa học này không chia sẻ tất cả mọi thứ về Laravel nhưng sẽ trang bị cho học viên những kiến thức quan trọng, cần thiết khi đi làm cần sử dụng tới.\nKhóa học này đang hướng dẫn ở phiên bản Laravel 8.x, 9.x, 10.x',
  }
  const resources = {
    header: 'Tài Nguyên',
    content:
      'Tài liệu trong khóa học: Xem tại đây\nSource Code dự án: https://github.com/Unicode-Academy/laravel-project\nLink nhóm Zalo: https://zalo.me/g/dbsbpk520',
  }

  return (
    <div className="d-grid gap-4">
      <CourseDetailDescriptionCard header={description.header} content={description.content} />
      <CourseDetailDescriptionCard header={resources.header} content={resources.content} />
      <CourseDetailModulesCard />
    </div>
  )
}

export default CourseDetail
