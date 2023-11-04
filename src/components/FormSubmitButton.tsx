"use client"

import { ComponentProps } from "react"
import { useFormStatus } from 'react-dom'
type FormSubmitButtonProps={
children:React.ReactNode, 
className?:string,
type?:string
}& ComponentProps<"button">
export default function FormSubmitButton({
    children,className,type,...props}:FormSubmitButtonProps) {
const {pending} =useFormStatus()
    return (
    <button {...props} type={type} className={className}
    disabled={pending}>
        {pending && <span className="loading loading-spinner"/>}
        {children}</button>
  )
}
