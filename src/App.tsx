import { useReducer, useState } from 'react'
import styles from './App.module.scss'
import Grid from './components/Grid/Grid'
import { size } from './constants';

function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function selectedReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
  }
}

// move to slice? or ContextWrapperComponent

export default function App() {
  // const [selected, setSelected] = useReducer(Array(size**size).fill(false).map(() => Array(size).fill(false)));
  const [tasks, dispatch] = useReducer(tasksReducer, Array(size**size).fill(false).map(() => Array(size).fill(false)));

  return (
    <>
      <Grid/>
    </>
  )
}
