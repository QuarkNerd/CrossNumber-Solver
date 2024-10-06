import { useState } from 'react'
import styles from './Grid.module.scss'
import { size } from '../../constants'

export default function Grid() {
  const [selected, setSelected] = useState(Array(size**size).fill(false).map(() => Array(size).fill(false)));

  return (
    <div className={styles.grid}>

    </div>
  )
}
