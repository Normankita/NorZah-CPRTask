import React from 'react'

export const Footer = () => {
  return (
    <footer>
        <span className='contact'>
          <span><i className="bi bi-telephone-fill"></i> +255 621 381 584</span>
          <span><i className="bi bi-envelope-fill"></i> kitanorman1@gmail.com</span>
        </span>
        <span className='brand'>NorZah &copy; {new Date().getFullYear()}</span>
    </footer>
  )
}
