"use client"
import Pomodoro from './podomoro/page'
import Timer from './podomoro/page'
import './style.css'
import Link from 'next/link'




export default function Home() {
  return (
    <>
    <main>
      <div className='switch'>
        <Link href="/">Pomodoro</Link>
        <Link href="/todo">To-do</Link>
      </div> 

      <Pomodoro/>
      
    </main>
    </>
  )
}
