import React from 'react';

export default function ({ repsData, setRepsData, dayClicked }) {
  console.log(repsData[dayClicked]);

  const [repsArray, setRepsArray] = React.useState([]);

  function addRep(e) {
    e.preventDefault();
    console.log('button clicked!');
    const formInputs = (
      <div className="inputs">
        <p>{repsArray.length + 1}</p>
        <input placeholder="Reps"></input>
        <input placeholder="Weight"></input>
      </div>
    );
    setRepsArray((prev) => {
      return [...prev, formInputs];
    });
    // setRepsData(prev=>{
    //     const addingSet = repsData[dayClicked][0].sets.push({reps: 0, weight: 0})
    // })
  }

  return (
    <form className="form">
      <button onClick={(e) => addRep(e)}>+</button>
      <p>
        Sets:
        {repsArray}
      </p>
    </form>
  );
}
