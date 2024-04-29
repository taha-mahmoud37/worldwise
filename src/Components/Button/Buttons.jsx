/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './Button.module.css'

export default function Buttons({children, onClick, type}) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  )
}
