import { useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound' //для работы со звуком
import youAreBeautiful from "./MercyMe - You're Beautiful.mp3" // импорт музыки
import cover from './cover.jpeg'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai' // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi' // иконки для следующего и предыдущего трека
import { IconContext } from 'react-icons' // для кастомизации иконок
import style from './style.module.css'

const DEFAULT_VALUE = 50

export const PlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currTime, setCurrTime] = useState<{
    min: number | null
    sec: number | null
  }>({
    min: null,
    sec: null,
  }) // текущее положение звука в минутах и секундах

  const [seconds, setSeconds] = useState(0) // текущая позиция звука в секундах

  const [play, { pause, duration, sound, stop }] = useSound(youAreBeautiful, {
    volume: DEFAULT_VALUE / 100,
  })

  const time = useMemo(() => {
    if (!duration)
      return {
        min: null,
        sec: null,
      }

    const sec = duration / 1000
    const min = Math.floor(sec / 60)
    const secRemain = Math.floor(sec % 60)

    return {
      min: min,
      sec: secRemain,
    }
  }, [duration])

  const playingButton = () => {
    if (isPlaying) {
      pause() // приостанавливаем воспроизведение звука
      setIsPlaying(false)
    } else {
      play() // воспроизводим аудиозапись
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek()) // устанавливаем состояние с текущим значением в секундах
        const min = Math.floor(sound.seek() / 60)
        const sec = Math.floor(sound.seek() % 60)

        if (time.min !== null && time.sec !== null && min >= time.min && sec - 1 >= time.sec) {
          setIsPlaying(false)
          stop()
        }

        setCurrTime({
          min,
          sec,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound, time])

  return (
    <div className={style.component}>
      <h2 style={{ marginTop: 0 }}>Playing Now</h2>
      <img className={style.musicCover} src={cover} />
      <div
        style={{
          position: 'relative',
        }}
      >
        <div>
          <div>
            <h3 className={style.title}>MercyMe</h3>
            <p className={style.subTitle}>You're Beautiful</p>
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
        <input
          data-orient='vertical'
          type='range'
          min={0}
          max={100}
          defaultValue={DEFAULT_VALUE}
          // value={sound ? sound.volume() * 100 : DEFAULT_VALUE}
          className={style.volume}
          onChange={e => sound?.volume(Number(e.target.value) / 100)}
        />
      </div>
      <div className={style.timelineContainer}>
        <div className={style.time}>
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type='range'
          min='0'
          max={duration ? duration / 1000 : 100}
          defaultValue='0'
          value={seconds}
          className={style.timeline}
          onChange={e => sound?.seek(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
