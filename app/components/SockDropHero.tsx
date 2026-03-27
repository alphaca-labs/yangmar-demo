'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Matter from 'matter-js'
import Sock from './Sock'
import { useDonationStore } from '@/store/donation'

interface SockBody extends Matter.Body {
  sockRef?: React.RefObject<HTMLDivElement>
  color?: 'white' | 'black'
}

const SOCK_SIZE = 80
const MAX_SOCKS = 200
const INITIAL_SOCK_COUNT = 40 // 초기에 쌓여있는 양말 수

const SockDropHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const bodiesRef = useRef<Record<number, SockBody>>({})
  const rafRef = useRef<number>(0)
  const initializedRef = useRef(false)

  const [renderedSocks, setRenderedSocks] = useState<SockBody[]>([])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const addSale = useDonationStore(state => state.addSale)
  const totalDonated = getTotalDonated()

  // ResizeObserver로 컨테이너 크기 추적
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setContainerSize({ width, height })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Matter.js 엔진 초기화
  useEffect(() => {
    const { width, height } = containerSize
    if (!width || !height || initializedRef.current) return
    initializedRef.current = true

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    })
    const runner = Matter.Runner.create()
    engineRef.current = engine
    runnerRef.current = runner

    // 바닥과 벽
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width + 200, 50, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 2, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 2, { isStatic: true })

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall])
    Matter.Runner.run(runner, engine)

    // 초기 양말 생성 — 바닥 1/3 영역에 쌓여있는 상태
    const initialSocks: SockBody[] = []
    const bottomThird = height * (2 / 3) // 하단 1/3 시작점

    for (let i = 0; i < INITIAL_SOCK_COUNT; i++) {
      const color: 'white' | 'black' = Math.random() < 0.5 ? 'white' : 'black'
      const x = 40 + Math.random() * (width - 80)
      // 바닥 1/3 영역 안에서 랜덤 y (약간의 높이 변화)
      const y = bottomThird + Math.random() * (height * 0.28)
      const angle = (Math.random() - 0.5) * Math.PI * 0.6

      const body: SockBody = Matter.Bodies.rectangle(x, y, SOCK_SIZE * 0.7, SOCK_SIZE * 0.7, {
        angle,
        friction: 0.9,
        restitution: 0.05,
        density: 0.015,
        frictionAir: 0.02,
      })
      body.sockRef = React.createRef<HTMLDivElement>()
      body.color = color
      bodiesRef.current[body.id] = body
      initialSocks.push(body)

      Matter.Composite.add(engine.world, body)
    }

    setRenderedSocks(initialSocks)

    // 렌더 루프
    const update = () => {
      Object.values(bodiesRef.current).forEach(body => {
        if (body.sockRef?.current) {
          const el = body.sockRef.current
          el.style.transform = `translate(${body.position.x - SOCK_SIZE / 2}px, ${body.position.y - SOCK_SIZE / 2}px) rotate(${body.angle}rad)`
        }
      })
      rafRef.current = requestAnimationFrame(update)
    }
    rafRef.current = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
      if (engineRef.current) Matter.Engine.clear(engineRef.current)
      initializedRef.current = false
    }
  }, [containerSize])

  // 클릭으로 양말 추가
  const addSock = useCallback(() => {
    const engine = engineRef.current
    const { width } = containerSize
    if (!engine || !width) return

    const color: 'white' | 'black' = Math.random() < 0.5 ? 'white' : 'black'
    const x = width * (0.15 + Math.random() * 0.7)
    const y = -SOCK_SIZE - Math.random() * 80
    const angle = (Math.random() - 0.5) * Math.PI

    const body: SockBody = Matter.Bodies.rectangle(x, y, SOCK_SIZE * 0.7, SOCK_SIZE * 0.7, {
      angle,
      friction: 0.9,
      restitution: 0.05,
      density: 0.015,
      frictionAir: 0.01,
    })
    body.sockRef = React.createRef<HTMLDivElement>()
    body.color = color
    bodiesRef.current[body.id] = body

    Matter.Composite.add(engine.world, body)

    setRenderedSocks(prev => {
      const next = [...prev, body]
      // 오래된 양말 정리
      if (next.length > MAX_SOCKS) {
        const oldest = next[0]
        Matter.Composite.remove(engine.world, oldest)
        delete bodiesRef.current[oldest.id]
        return next.slice(1)
      }
      return next
    })

    addSale(color, 1)
  }, [containerSize, addSale])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] bg-[#FAFAFA] cursor-pointer overflow-hidden select-none"
      onClick={addSock}
    >
      {/* 중앙 기부 카운터 UI */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">
          donated socks
        </p>
        <div className="text-6xl md:text-8xl font-black text-[#1A1A1A] tabular-nums leading-none mb-2"
             style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8)' }}>
          {totalDonated.toLocaleString()}
        </div>
        <p className="text-sm text-[#666] mb-1">켤레의 양말이 기부되었습니다</p>
        <p className="text-xs text-[#999] mt-6 animate-pulse">
          화면을 클릭해서 양말을 기부하세요 🧦
        </p>
      </div>

      {/* 양말 렌더링 레이어 */}
      <div className="absolute inset-0 z-10">
        {renderedSocks.map(body => (
          <Sock key={body.id} ref={body.sockRef} color={body.color!} />
        ))}
      </div>
    </section>
  )
}

export default SockDropHero
