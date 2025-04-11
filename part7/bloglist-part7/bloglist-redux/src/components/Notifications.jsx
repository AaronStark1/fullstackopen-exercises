import { Alert } from 'react-bootstrap'
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons'
import '../styles/Notifications.css'

const Notifications = ({ message, isError }) => {
  if (!message) return null

  return (
    <div className="notification-wrapper">
      <Alert variant={isError ? 'danger' : 'success'} className="custom-alert d-flex align-items-center">
        {isError ? (
          <ExclamationTriangleFill className="me-2 alert-icon" />
        ) : (
          <CheckCircleFill className="me-2 alert-icon" />
        )}
        <span>{message}</span>
      </Alert>
    </div>
  )
}

export default Notifications
