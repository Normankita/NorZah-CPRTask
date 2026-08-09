import './Toast.css'

const Toast = ({ toast, onUndo, onDismiss }) => {
  if (!toast) return null

  return (
    <div className="toast" role="status">
      <i className="bi bi-check-circle-fill"></i>
      <span className="toast-msg">{toast.message}</span>
      {toast.onUndo &&
        <button type="button" className="toast-undo" onClick={onUndo}>
          <i className="bi bi-arrow-counterclockwise"></i> Undo
        </button>
      }
      <button type="button" className="toast-close" onClick={onDismiss} aria-label="Dismiss">
        <i className="bi bi-x-lg"></i>
      </button>
      <span className="toast-bar"></span>
    </div>
  )
}

export default Toast
