import React, { useState } from 'react';
import Modal from 'react-modal';
import './GameComponent.css'; // Certifique-se de ter o arquivo CSS com os estilos

Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

const GameComponent = () => {
  const initialActiveState = [true].concat(Array(19).fill(false));

  const [cellsLeft, setCellsLeft] = useState([...initialActiveState]);
  const [currentCellLeft, setCurrentCellLeft] = useState(0);

  const [cellsRight, setCellsRight] = useState([...initialActiveState]);
  const [currentCellRight, setCurrentCellRight] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [currentSide, setCurrentSide] = useState('left'); // Adicionado estado para controlar o lado no modal

  const handleCellClick = (side, index) => {
    const currentCell = side === 'left' ? currentCellLeft : currentCellRight;
    const setCurrentCell = side === 'left' ? setCurrentCellLeft : setCurrentCellRight;

    if (currentCell === index) {
      setCurrentSide(side); // Atualiza o lado no clique da célula
      setShowModal(true);
    } else {
      alert('Você só pode clicar na próxima célula.');
    }
  };

  const handleAnswer = (isCorrect) => {
    setShowModal(false);

    if (isCorrect) {
      const setCurrentCell = currentSide === 'left' ? setCurrentCellLeft : setCurrentCellRight;
      const setCells = currentSide === 'left' ? setCellsLeft : setCellsRight;

      setCells((prevCells) => {
        const updatedCells = [...prevCells];
        updatedCells[currentSide === 'left' ? currentCellLeft : currentCellRight] = true;
        return updatedCells;
      });

      if (currentSide === 'left') {
        setCurrentCellLeft((prev) => prev + 1);
      } else {
        setCurrentCellRight((prev) => prev + 1);
      }

      if (currentCellLeft === 19 || currentCellRight === 19) {
        alert(`Usuário ${currentSide.toUpperCase()} venceu!`);
      }
    }
  };

  const renderCells = (side, cells, handleClick) => {
    return cells.map((isActive, index) => (
      <div key={index} className={`cell ${index === (side === 'left' ? currentCellLeft : currentCellRight) ? 'active' : ''}`} onClick={() => handleClick(side, index)}>
        {index + 1}
        {index === (side === 'left' ? currentCellLeft : currentCellRight) && (
          <img src={side === 'left' ? 'johnsnow.jpg' : 'whitewalker.jpg'} alt={`Active on ${side}`} className="active-image" style={{ height: '80px' }} />
        )}
      </div>
    ));
  };

  return (
    <div className="game-container">
      <div className="cells-container">
        <div className="left-cells">{renderCells('left', cellsLeft, handleCellClick)}</div>
        <div className="divider"></div>
        <div className="right-cells">{renderCells('right', cellsRight, handleCellClick)}</div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal-content custom-modal"
        overlayClassName="modal-overlay"
      >
        <p className="modal-question">Qual a cor da laranja?</p>
        <button className="modal-button" onClick={() => handleAnswer(true)}>
          1 - laranja
        </button>
        <button className="modal-button" onClick={() => handleAnswer(false)}>
          2 - azul
        </button>
      </Modal>
    </div>
  );
};

export default GameComponent;