import React, { FormEvent, useState } from 'react';
import ReactModal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const {createTransaction} = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();

    await createTransaction({
        title,
        amount: String(value),
        category,
        type
    })

    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }


  return (
    <ReactModal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
        <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h1>Cadastrar transação</h1>


            <input 
            onChange={e => setTitle(e.target.value)}
            value={title}
            placeholder="Título"/>

            <input 

            onChange={e => setValue(Number(e.target.value))}
            value={value}
            type="number"
            placeholder="Valor"
            />

            <TransactionTypeContainer>
                <RadioBox 
                type="button" 
                isActive={type === 'deposit'}
                onClick={() => {setType('deposit')}}
                activeColor="green"
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                type="button" 
                isActive={type === 'withdraw'}
                onClick={() => {setType('withdraw')}}
                activeColor="red"
                >
                    <img src={outcomeImg} alt="Saida" />
                    <span>Saida</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input
            onChange={e => setCategory(e.target.value)}
            value={category}
            placeholder="Categoria" />
            
            <button type="submit">Cadastrar</button>
            
        </Container>




    </ReactModal>
  );
}

export default NewTransactionModal;