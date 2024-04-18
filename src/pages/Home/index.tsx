import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HomeContainer,
  StarCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import * as zod from 'zod'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContexts'

/* Inicio do codigo */

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O circlo precisa ser no minimo 5 minutos.')
    .max(60, 'O circlo precisa ser no maximo 60 minutos.'),
})

type NewCircleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCircle, interroptCycle, activeCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<NewCircleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCircleFormData) {
    createNewCircle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interroptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StarCountDownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StarCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
