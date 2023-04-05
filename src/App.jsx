import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import liftLogo from './assets/liftLogo.png';
import DropZone from './components/dropTarget';
import DragItem from './components/dragItems';
import PopupModal from './components/modal.jsx';

function App() {
  const [exercises, setExercises] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const exercisesRef = useRef([]);
  const [daysExercises, setDaysExercises] = React.useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [repsData, setRepsData] = React.useState({
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

  const fetchExercises = () => {
    fetch('http://localhost:3000/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        exercisesRef.current = data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // submit when you press enter
  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  // set input value everytime you type
  const handleInputChangeValue = (event) => {
    setInputValue(event.target.value);
  };

  // submit functionality
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
        // Call fetchExercises to update the list of exercises
        fetchExercises();
      })
      .catch((err) => console.error('Error creating exercise:', err));
    setInputValue('');
  };

  // function for deleting an exercise
  const handleDelete = (name) => (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/exercises', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exercise_name: name }),
    })
      .then(() => fetchExercises())
      .catch((error) => console.log(error));
  };

  // function for changing state
  function handleDrop(day, itemId) {
    const exerciseIndex = Number(itemId.slice(9));
    console.log(exercisesRef.current);
    const dropExercise = exercisesRef.current[exerciseIndex].name;
    const repExercise = {};
    repExercise.name = dropExercise;
    repExercise.sets = [];

    // Update the exercises state for the specific day
    setDaysExercises((prev) => ({
      ...prev,
      [day]: [
        ...prev[day],
        <p key={dropExercise + prev[day].length} className="day-exercise">
          {dropExercise}
        </p>,
      ],
    }));
    setRepsData((prev) => ({
      ...prev,
      [day]: [...prev[day], repExercise],
    }));
  }

  console.log(repsData);

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
        <div
          key={el.name}
          className="exerciseContainer"
          style={{ padding: '4px' }}
        >
          <DragItem
            id={`exercise-${index}`}
            text={el.name}
            className="exercise"
          />
          <button
            // key={el.name}
            text="X"
            id={el.name}
            className="deleteBtn"
            onClick={handleDelete(el.name)}
          >
            X
          </button>
        </div>
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
          repsData={repsData}
          setRepsData={setRepsData}
        />
      )}
      <div className="Week">{daysArray}</div>
      <div className="rightColumn">
        <img
          src={liftLogo}
          className="liftLogo"
          style={{ opacity: openModal ? 0.7 : 1 }}
        />
        <h2>Buff McGee</h2>
        <div className="menu" style={{ padding: '4px' }}>
          <input
            autoComplete="off"
            type="text"
            value={inputValue}
            name="exercise"
            placeholder="New Exercise"
            style={{ color: 'black' }}
            onKeyDown={handleInputChange}
            onChange={handleInputChangeValue}
            className="new-exercise"
          />
          {exercisesMenu()}
        </div>
      </div>
    </div>
  );
}

export default App;
