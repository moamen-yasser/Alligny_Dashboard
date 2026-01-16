import { IoEye, IoEyeOff } from "react-icons/io5";

export default function VisibilityToggleIcon({ reveal }) {
  return (
    reveal ? (
        <IoEye className="!text-main" style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
        <IoEyeOff className="!text-main" style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    )
  )
}

