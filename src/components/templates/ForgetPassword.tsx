// React
import { ChangeEvent, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// Material
import { Fab, Checkbox, Avatar, TextField, Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

// Molecules
import ShowSteps, { StepInterface } from '@components/molecules/ShowSteps'
import { AlertMessage } from '@components/molecules/AlertMessage'
import Copyright from '@components/molecules/Copyright'
import Loading from '@components/molecules/Loading'

// Hooks
import {
  useAccountQueryForgetPassword,
  useAccountQueryForgetResetPassword,
} from '@hooks/queries/Account'

// Validations
import AccountValidate from '@validations/AccountValidate'

// Types
import { messageInterface } from '@type/Message'
import { APIErrorI } from '@type/API'

interface IChangePassword {
  email: string
  code: string
  password: string
  confirmPassword: string
}

export default function Forget() {
  const [nextStepFunction, setNextStepFunction] = useState<VoidFunction>()
  const [showPass, setShowPass] = useState(false)
  const [message, setMessage] = useState<messageInterface>({ message: '', severity: 'success' })
  const { control, getValues } = useForm<IChangePassword>()
  const history = useHistory()

  const onError:
    | ((error: APIErrorI, variables: unknown, context: unknown) => void | Promise<unknown>)
    | undefined = ({ response }) => {
    setMessage({
      severity: 'error',
      message: response.data.meta.cause,
    })
  }

  const { mutateAsync: sendForgetPasswordEmail, isLoading: isSendForgetPasswordEmailLoading } =
    useAccountQueryForgetPassword({
      onError,
      onSuccess() {
        nextStepFunction && nextStepFunction()
        setMessage({
          severity: 'success',
          message: 'Email enviado com sucesso',
        })
      },
    })
  const { mutate: resetPassword, isLoading: isResettingPassword } =
    useAccountQueryForgetResetPassword({
      onError,
      onSuccess() {
        setMessage({
          severity: 'success',
          message: 'Senha alterada com sucesso',
        })

        // Espera o usuário ler a mensagem e então navega ele até a página login
        setTimeout(() => {
          history.push('/login')
        }, 3000)
      },
    })

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => setShowPass(!showPass)

  function FirstStep() {
    return (
      <Box component="form" className="form" method="POST">
        <Box mt={3}>
          <Typography variant="subtitle1">Insira seu email</Typography>
        </Box>
        <Controller
          control={control}
          defaultValue=""
          name="email"
          render={({ field }) => (
            <TextField
              error={message?.severity === 'error'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              {...field}
            />
          )}
        />
      </Box>
    )
  }
  function SecondStep() {
    return (
      <Box component="form" className="form" method="POST">
        <Box mt={3}>
          <Typography variant="subtitle1">Insira o código que enviamos para o seu email</Typography>
        </Box>
        <Controller
          control={control}
          defaultValue=""
          name="code"
          render={({ field }) => (
            <TextField
              error={message?.severity === 'error'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Código"
              autoComplete="code"
              autoFocus
              {...field}
            />
          )}
        />
      </Box>
    )
  }
  function ThirdStep() {
    return (
      <Box component={'form'} className="form" method="POST">
        <Box mt={3}>
          <Typography variant="subtitle1">Insira sua nova senha</Typography>
        </Box>
        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field }) => (
            <TextField
              error={message?.severity === 'error'}
              type={showPass ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nova senha"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="confirmPassword"
          render={({ field }) => (
            <TextField
              error={message?.severity === 'error'}
              type={showPass ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirme a senha"
              {...field}
            />
          )}
        />
        <Box display="flex" alignItems="center" marginY={1}>
          <Checkbox checked={showPass} color="primary" onChange={handleCheckbox} />
          <Typography variant="subtitle2">Mostrar senha</Typography>
        </Box>
      </Box>
    )
  }

  const sendEmail = async (nextStep: VoidFunction) => {
    const email = getValues().email

    const validation = await AccountValidate.forgetPasswordEmail({ email })
    if (validation !== true) return setMessage({ severity: 'error', message: validation.message })

    await sendForgetPasswordEmail({ email })
    setNextStepFunction(nextStep)
  }

  const checkCode = async (nextStep: VoidFunction) => {
    const code = getValues().code

    const validation = await AccountValidate.forgetPasswordCheckCode({ code })
    if (validation !== true) return setMessage({ severity: 'error', message: validation.message })

    setNextStepFunction(nextStep)
    setMessage({
      message: 'O código está dentro dos padrões',
      severity: 'success',
    })
  }

  const changePassword = async (nextStep: VoidFunction) => {
    const { confirmPassword, code, ...rest } = getValues()

    const validation = await AccountValidate.forgetResetpassword({ ...rest, confirmPassword, code })
    if (validation !== true) return setMessage({ severity: 'error', message: validation.message })

    resetPassword({ ...rest, token: code })
    setNextStepFunction(nextStep)
  }

  const stepsComponents: StepInterface[] = [
    {
      step: <FirstStep />,
      label: 'Insira seu email',
      onClick: (nextStep) => sendEmail(nextStep),
    },
    {
      step: <SecondStep />,
      label: 'Confirme o código',
      onClick: (nextStep) => checkCode(nextStep),
    },
    {
      step: <ThirdStep />,
      label: 'Altere sua senha',
      onClick: (nextStep) => changePassword(nextStep),
    },
  ]

  return (
    <div>
      <Box position="absolute" m={2}>
        <Fab component={RouterLink} to="/login" color="primary" aria-label="Voltar" size="small">
          <ArrowBackIosIcon fontSize="small" />
        </Fab>
      </Box>
      <Box className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Mudar senha
        </Typography>
        <ShowSteps components={stepsComponents} />

        <AlertMessage message={message}>{message.message}</AlertMessage>
        <Loading loading={isSendForgetPasswordEmailLoading || isResettingPassword} />
        <Box style={{ position: 'absolute', bottom: 50 }}>
          <Copyright />
        </Box>
      </Box>
    </div>
  )
}
