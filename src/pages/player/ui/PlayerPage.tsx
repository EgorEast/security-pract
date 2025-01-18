import { useState } from 'react'
import useSound from 'use-sound' //для работы со звуком
import qala from '../assets/qala.mp3' // импорт музыки
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai' // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi' // иконки для следующего и предыдущего трека
import { IconContext } from 'react-icons' // для кастомизации иконок

import style from './style.module.css'

export const PlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { pause, duration, sound }] = useSound(qala)

  const playingButton = () => {
    if (isPlaying) {
      pause() // приостанавливаем воспроизведение звука
      setIsPlaying(false)
    } else {
      play() // воспроизводим аудиозапись
      setIsPlaying(true)
    }
  }

  return (
    <div className={style.component}>
      <h2>Playing Now</h2>
      <img className={style.musicCover} src='https://picsum.photos/200/200' />
      <div>
        <h3 className={style.title}>Rubaiyyan</h3>
        <p className={style.subTitle}>Qala</p>
      </div>
      <div>
        <button className={style.playButton}>
          <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className={style.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={style.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className={style.playButton}>
          <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  )
}
