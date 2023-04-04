import React from 'react';
import './App.css';
import liftLogo from './assets/liftLogo.png';
import DropZone from './components/dropTarget';
import DragItem from './components/dragItems';
import PopupModal from './components/modal.jsx';

function App() {
  const [daysExercises, setDaysExercises] = React.useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [openModal, setOpenModal] = React.useState(false);
  const body = document.body;
  if (openModal) body.classList.add('dark-background');
  if (!openModal) body.classList.remove('dark-background');

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

  const exercises = [
    '+',
    'Cable Flys',
    'French Press',
    'Turkish diet-up',
    'Box Jumps',
    'Donut Eating',
    'Squats',
    'Leg Press',
    'Bicep Curls',
    'Push ups',
    'Dead Lifts',
    'Planks',
  ];

  function dayOfWeek() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

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
        >
          {day}
          {daysExercises[day]}
        </DropZone>
      );
    });
  }

  const daysArray = dayOfWeek();

  const exercisesMenu = () => {
    return exercises.map((el, index) => {
      return (
        <DragItem
          key={el}
          id={`exercise-${index}`}
          text={el}
          className="exercise"
        />
      );
    });
  };

  return (
    <div className="App">
      {openModal && <PopupModal />}
      <div className="Week">{daysArray}</div>
      <div>
        <img src={liftLogo} className="liftLogo" />
        <h2>Username goes here</h2>
        <div className="menu">{exercisesMenu()}</div>
      </div>
    </div>
  );
}

export default App;
