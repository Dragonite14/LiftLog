import React from 'react';

export default function () {

    const repsArray = [];


    function addRep (e) {
        e.preventDefault()
        repsArray.push()
    }

    return (
    <form className='form'>
        <button onClick={addRep}>+</button>
    </form>)
}