import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [listBooks, setListBooks] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [index, setIndex] = useState(0);
  const [people, setPeople] = useState('');
  const [yearCreate, setYearCreate] = useState('');
  const [book, setBook] = useState('');
  const [counterList, setCounterList] = useState('');
  
  useEffect(() => {
    if (getStorage() && listBooks.length <= 0) {
      setListBooks([...getStorage()]);
    }
  });
  
  // Если дергать таргет у формы чтобы сделать e.target.reset() - происходит баг без ошибки.
  // Вызвав один раз кнопкой submit форма сбрасывается, когда меняется логика - reset уже не работает.
  function reset() {
    setPeople('');
    setYearCreate('');
    setBook('');
    setCounterList('');
  }
  
  function getStorage() {
    return JSON.parse(localStorage.getItem('lists'))
  }
  
  function addBooks(e) {
    e.preventDefault();
    
    if (editForm) {
      setEditForm(false);
      listBooks[index] = {
        people,
        yearCreate,
        book,
        counterList
      };
    } else {
      localStorage.setItem('lists', JSON.stringify([
        ...listBooks,
        {
          people,
          yearCreate,
          book,
          counterList
        }
      ]));
      setListBooks(getStorage());
    }
    reset();
  }
  
  function rem(i) {
    listBooks.splice(i, 1);
    setListBooks([...listBooks]);
  }

  function edit(i) {
    setEditForm(true);
    setPeople(listBooks[i].people);
    setYearCreate(listBooks[i].yearCreate);
    setBook(listBooks[i].book);
    setCounterList(listBooks[i].counterList);
    setIndex(i);
  }
  
  return (
    <div className="App">
      <div className="form-add-new-book">
        <h4>Добавить новую книгу</h4>
        <form onSubmit={(e) => addBooks(e)} className={editForm ? 'form-edit' : null}>
          <label><input type="text" value={people} onChange={(e) => setPeople(e.target.value)} name="people" placeholder="Автор"/></label>
          <label><input type="date" value={yearCreate} onChange={(e) => setYearCreate(e.target.value)} name="yearCreate"/></label>
          <label><input type="text" value={book} onChange={(e) => setBook(e.target.value)} name="book" placeholder="Название книги"/></label>
          <label><input type="number" value={counterList} onChange={(e) => setCounterList(e.target.value)} name="counterList"  placeholder="Количество страниц"/></label>
          <label htmlFor=""><input type="submit" value={!editForm ? 'Добавить книгу' : 'Сохранить'}/></label>
        </form>
      </div>
      
      <ul className="list-books">
        {!listBooks ? null : listBooks.length < 1 ? <li className="center">Список книг пуст</li> : listBooks.map((el, i) => (
          <li key={i} className={(editForm && i == index) ? 'form-edit' : null}>
            <p>{el.people}</p>
            <p>{el.book}</p>
            <div className="bottom-controllers">
              <button onClick={() => edit(i)}>Изменить</button>
              <button onClick={() => rem(i)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
