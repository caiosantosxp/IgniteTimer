import { useContext, useEffect } from 'react'
import { CountDownContainer, Separtor } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../../contexts/CyclesContexts'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPadded,
  } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const correntSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(correntSeconds / 60)
  const secondsAmount = correntSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconts = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Time: ${minutes + ':' + seconts}`
    } else {
      document.title = `Ignite Time`
    }
  }, [minutes, seconts, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPadded(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPadded(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPadded,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separtor>:</Separtor>
      <span>{seconts[0]}</span>
      <span>{seconts[1]}</span>
    </CountDownContainer>
  )
}
