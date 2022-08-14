import React, { useState, useEffect } from 'react'
import Modal from './Modal/Modal';
import Question from './Question';
function Board({ setScore }) {

  const [quest, setQuest] = useState([]);
  const [cat, setCat] = useState([])
  const [modal, setModal] = useState(false)
  const [curr, setCurr] = useState({})



  useEffect(() => {
    fetch('/cats').then((res) => res.json()).then((res) => {
      setQuest(res.questions);
      setCat(res.cats)
    });
  }, []);

  function handleSubmit(input, ans, points) {
    if (input.toLowerCase().trim() == ans.toLowerCase().trim()) {
      setScore((prev) => prev + points)
      return true
    }
    else {
      setScore((prev) => prev - points)
      return false
    }
  }


  return (
    <div className="container">
      <Modal visible={modal} setVisible={setModal}>
        <Question curr={curr} handleSubmit={handleSubmit} setModal={setModal} />
      </Modal>
      {cat.map(el =>
        <div className="wrapper">
          <div className='title'>
            {el.catTitle}
          </div>
          {quest.filter(q => q.cat_id === el.id).map(question =>
            <div className='question' onClick={(e) => {
              e.target.classList.add('hidden');
              setModal(true)
              setCurr(question)
            }}>
              {question.points}
            </div>)}
        </div>)}
    </div>
  )
}

export default Board
