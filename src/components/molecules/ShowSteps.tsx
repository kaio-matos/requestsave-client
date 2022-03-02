import { useState } from 'react'
import { Button, StepLabel, Step, Stepper, Box } from '@mui/material'

export interface StepInterface {
  step: JSX.Element
  label: string
  onClick: (nextStep: VoidFunction) => void
}

function getStepContent(stepIndex: number, components: StepInterface[]) {
  if (!components[stepIndex]) return <></>
  return components[stepIndex].step
}
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
export default function ShowSteps({ components }: { components: StepInterface[] }) {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (components[activeStep])
      components[activeStep].onClick(() => {
        setActiveStep((prevActiveStep) => {
          if (prevActiveStep + 1 === components.length) return prevActiveStep
          return prevActiveStep + 1
        })
      })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box marginY={3}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {components.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep, components)}
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack} className="backButton">
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === components.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </Box>
  )
}
