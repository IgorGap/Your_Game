import React from 'react'
import { useState } from 'react'

const Question = ({curr, handleSubmit, setModal}) => {

  const [text, setText] = useState('')
  const [done, setDone] = useState(true)
  const [bool, setBool] = useState(false)
  console.log(curr);

  return done ? (
    <div className='modal'>
      <div className="modalQ">
      {curr.question}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        setBool(handleSubmit(text,curr.answer,curr.points))
        setText('')
        setDone(false)
      }}>
        <input type="text" placeholder='Ответ' value={text} onChange={(e) => setText(e.target.value)} />
        <button className='btn' type='submit'>Ответить</button>
      </form>
    </div>
  ) : 
  (
    <div className="modal">
      <div className="modalQ">
        <div className={bool ? 'true' : 'false'}>{bool ? 'Правильно!' : 'Неправильно!'}</div>

        {curr.comment}
      </div>
      <button className='btn' onClick={() => {
        setDone(true)
        setModal(false)
        }}>Понятно</button>
    </div>
  )
}

export default Question
