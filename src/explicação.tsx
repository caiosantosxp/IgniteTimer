import { createContext, useContext, useState } from 'react'

const CyclesContex = createContext({})

function NewCycleForm() {
  const { active, setActive } = useContext(CyclesContex)
  return (
    <h1>
      NewCycleForm: {active}
      <button
        onClick={() => {
          setActive(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </h1>
  )
}

function CountDown() {
  const { active } = useContext(CyclesContex)
  return <h1>ContDown: {active}</h1>
}

export function Home() {
  const [active, setActive] = useState(0)
  return (
    <CyclesContex.Provider value={{ active, setActive }}>
      <div>
        <h1>Home</h1>
        <NewCycleForm />
        <CountDown />
      </div>
    </CyclesContex.Provider>
  )
}
