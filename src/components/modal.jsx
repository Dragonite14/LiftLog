import React from 'react';
import Table from './tables/displayTables.jsx';
import Form from './tables/form.jsx';

export default function popupModal({
  dayClicked,
  daysExercises,
  setOpenModal,
  setRepsData,
  repsData
}) {
  // edit mode
  const [editMode, setEditMode] = React.useState(false);

  // grabbing all the drag and dropped exercises
  const exercises = React.Children.map(daysExercises[dayClicked], (child) => {
    if (typeof child.props.children === 'string') {
      return child.props.children;
    }
    return null;
  });

  // turning them back into JSX elements specifically for the modal
  const modalExercises = exercises.map((el) => {
    return (
      <div className="modal-exercise">
        <h3 key={el + dayClicked}>{el}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-pencil-square edit-exercise"
          viewBox="0 0 16 16"
          onClick={() => setEditMode(!editMode)}
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
        <div className="display-reps">{editMode ? <Form setRepsData={setRepsData} repsData={repsData}
        dayClicked={dayClicked}/> : <Table />}</div>
      </div>
    );
  });

  return (
    <div id="popup-modal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fillRule="currentColor"
        className="bi bi-x-lg close-model"
        viewBox="0 0 16 16"
        onClick={() => setOpenModal(false)}
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
      <h1 className="modal-day">{dayClicked}</h1>
      {modalExercises}
    </div>
  );
}
