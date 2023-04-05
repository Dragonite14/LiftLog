import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import './App.css';
import liftLogo from './assets/liftLogo.png';
import DropZone from './components/dropTarget';
import DragItem from './components/dragItems';
import PopupModal from './components/modal.jsx';

function App() {
  const [exercises, setExercises] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [daysExercises, setDaysExercises] = React.useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  // modal state
  const [openModal, setOpenModal] = React.useState(false);
  // to show on modal what day
  const [dayClicked, setDayClicked] = React.useState(null);

  // for modal effect of lighter background
  React.useEffect(() => {
    const body = document.body;
    if (openModal) body.classList.add('light-background');
    if (!openModal) body.classList.remove('light-background');
  }, [openModal]);

  // const { data, isLoading, isError, refetch } = useQuery(
  //   'exercises',
  //   async () => {
  //     const response = await fetch('http://localhost:3000/api/exercises');
  //     const data = await response.json();
  //     return data;
  //   }
  // );

  // useEffect(() => {
  //   setExercises(data);
  // }, [data]);

  const fetchExercises = () => {
    fetch('http://localhost:3000/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exercise_name: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Exercise Added', data);
        // Call fetchExercises to update the list of exercises
        fetchExercises();
      })
      .catch((err) => console.error('Error creating exercise:', err));
    setInputValue('');
    event.target.reset();
  };

  // function for changing state
  function handleDrop(day, itemId) {
    const exerciseIndex = Number(itemId.slice(9));
    const exercise = exercises[exerciseIndex];

    // Update the exercises state for the specific day
    setDaysExercises((prev) => ({
      ...prev,
      [day]: [
        ...prev[day],
        <p key={exercise + prev[day].length} className="day-exercise">
          {exercise}
        </p>,
      ],
    }));
  }

  function dayOfWeek() {
    // array of all the days of the week
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // to match today's day to make it "glow"
    const currentDate = new Date();
    const today = days[currentDate.getDay()];

    return days.map((day) => {
      const isToday = today === day;
      return (
        <DropZone
          key={day}
          id={day}
          onDrop={(matchDay, itemId) => {
            handleDrop(matchDay, itemId);
          }}
          setOpenModal={setOpenModal}
          openModal={openModal}
          className={isToday ? 'day today' : 'day'}
          day={day}
          setDayClicked={setDayClicked}
        >
          {day}
          {daysExercises[day]}
        </DropZone>
      );
    });
  }

  // will render array of JSX week days later
  const daysArray = dayOfWeek();

  // returns all drag targets
  const exercisesMenu = () => {
    return exercises.map((el, index) => {
      return (
        <DragItem
          key={el.name}
          id={`exercise-${index}`}
          text={el.name}
          className="exercise"
        />
      );
    });
  };

  // main return for App
  return (
    <div className="App">
      {openModal && (
        <PopupModal
          dayClicked={dayClicked}
          daysExercises={daysExercises}
          setOpenModal={setOpenModal}
        />
      )}
      <div className="Week">{daysArray}</div>
      <div>
        <img
          src={liftLogo}
          className="liftLogo"
          style={{ opacity: openModal ? 0.7 : 1 }}
        />
        <h2>Buff McGee</h2>
        <div className="menu">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              name="exercise"
              placeholder="New Exercise"
              style={{ color: 'black' }}
              onChange={handleInputChange}
            />
            <button type="submit" style={{ color: 'black' }}>
              Add exercise
            </button>
          </form>
          {exercisesMenu()}
        </div>
      </div>
    </div>
  );
}

export default App;
