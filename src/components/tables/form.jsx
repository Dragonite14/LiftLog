import React from 'react';

export default function form() {
  function addRep(e) {
    e.preventDefault();
  }

  return (
    <form className="form">
      <button onClick={addRep}>+</button>
    </form>
  );
}
