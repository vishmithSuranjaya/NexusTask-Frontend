import React from 'react'

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4"> 
        <div className="bg-white dark:bg-[#0f172a] dark:text-white text-black rounded-lg shadow-lg p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
