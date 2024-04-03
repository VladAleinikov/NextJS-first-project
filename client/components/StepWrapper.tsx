import React from 'react'
interface StepWrapperProps{
      activeStep: number,
}
const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
  return (
    <div>{children}</div>
  )
}

export default StepWrapper