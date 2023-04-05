import React, { useState, useEffect } from 'react';
import './App.css';
import liftLogo from './assets/liftLogo.png';
import DropZone from './components/dropTarget';
import DragItem from './components/dragItems';
import PopupModal from './components/modal.jsx';

function App() {
  const [exercises, setExercises] = useState([]);
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

  useEffect(() => {
    // fetch('/api/exercises')
    fetch('http://localhost:3000/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log('exercises', exercises);
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
        <h2>Username goes here</h2>
        <div className="menu">{exercisesMenu()}</div>
      </div>
    </div>
  );
}

export default App;
