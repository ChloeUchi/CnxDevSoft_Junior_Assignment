import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FavPoke from './components/FavPoke';

const App = () => {
  const [poke, setPoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal,
        });
    
        setPoke(response.data);
        setError('');
      } catch (error) {
        setError("Something went wrong: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  const removeFavPoke = (pokemonNameToRemove) => {
    // Use a filter to remove the Pokémon from the 'fav' state based on its name
    const updatedFav = fav.filter((pokemon) => pokemon.name !== pokemonNameToRemove);
    setFav(updatedFav);
  };

  const handleCreateTask = () => {
    const newTaskObj = { id: tasks.length + 1, text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleUpdateTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleSwipeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          <h1>{poke?.name}</h1>
          <button onClick={addFav}>Add to favorite</button>
          <button onClick={() => removeFavPoke(poke?.name)}>Remove from favorite</button>
          <br />
          <img src={poke?.sprites?.other?.home.front_default} alt={poke?.name} />
          <ul>
            {poke?.abilities?.map((abil, idx) => (
              <li key={idx}>{abil.ability.name}</li>
            ))}
          </ul>
          <button onClick={prevPoke}>Previous</button>
          <button onClick={nextPoke}>Next</button>
        </div>
        <div>
          <h2>Your favorite pokemon</h2>
          <FavPoke fav={fav} />
        </div>
        <div>
          <br />
          <h2>To-Do List</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <span onClick={() => handleSwipeTask(task.id)} className='task-text'>
                  {task.text}
                </span>
                <button onClick={() => handleUpdateTask(task.id, prompt('Edit task', task.text))} className='edit-button' >Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className='delete-button'>Delete</button>
              </li>
            ))}
          </ul>
          <div className='add-task border rounded p-1'>
            <input type='text' placeholder='New task' value={newTask} onChange={(e) => setNewTask(e.target.value)} className='task-input'/>
            <button onClick={handleCreateTask} className='add-button'>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
