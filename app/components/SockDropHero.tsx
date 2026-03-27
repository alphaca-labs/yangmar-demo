'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Matter from 'matter-js'
import Sock from './Sock'
import StaticLink from './StaticLink'
import { useDonationStore } from '@/store/donation'

interface SockBody extends Matter.Body {
  ref?: React.RefObject<SVGSVGElement>
  color?: 'white' | 'black'
}

const SockDropHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const engineRef = useRef<Matter.Engine>()
  const runnerRef = useRef<Matter.Runner>()
  const bodiesRef = useRef<Record<string, SockBody>>({})
  const [renderedSocks, setRenderedSocks] = useState<SockBody[]>([])
  const { addSale } = useDonationStore()

  const setupMatter = useCallback(() => {
    if (!containerSize.width || !containerSize.height) return
    
    const engine = Matter.Engine.create({
      gravity: { y: 0.6, x: 0 },
      timing: { timeScale: 1.2 }
    })
    const runner = Matter.Runner.create()
    engineRef.current = engine
    runnerRef.current = runner

    const { width, height } = containerSize
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true })

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall])
    Matter.Runner.run(runner, engine)

    const update = () => {
      Object.values(bodiesRef.current).forEach(body => {
        if (body.ref?.current) {
          body.ref.current.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`
        }
      })
      requestAnimationFrame(update)
    }
    update()
  }, [containerSize])

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect
        setContainerSize({ width, height })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setupMatter()
    return () => {
      if (engineRef.current) Matter.Engine.clear(engineRef.current)
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
    }
  }, [setupMatter])

  const addSock = useCallback(() => {
    if (!engineRef.current || !containerSize.width) return

    const color = Math.random() < 0.5 ? 'white' : 'black'
    const x = containerSize.width * (0.2 + Math.random() * 0.6)
    const y = -100 - Math.random() * 100
    const angle = Math.random() * Math.PI * 2
    
    const sockBody: SockBody = Matter.Bodies.rectangle(x, y, 60, 60, { 
      angle,
      friction: 0.8,
      restitution: 0.1,
      density: 0.01,
    })

    sockBody.ref = React.createRef<SVGSVGElement>()
    sockBody.color = color

    Matter.Composite.add(engineRef.current.world, sockBody)
    bodiesRef.current[sockBody.id] = sockBody
    
    setRenderedSocks(prev => {
        const newSocks = [...prev, sockBody]
        if (newSocks.length > 200) {
            const oldestSock = newSocks[0]
            Matter.Composite.remove(engineRef.current!.world, oldestSock)
            delete bodiesRef.current[oldestSock.id]
            return newSocks.slice(1)
        }
        return newSocks
    })

    addSale(color, 1)
  }, [containerSize.width, addSale])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] bg-gray-50 cursor-pointer overflow-hidden"
      onClick={addSock}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="text-sm text-[#666] mb-4 tracking-widest uppercase">click to donate</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          한 번의 클릭,<br />한 켤레의 따뜻함
        </h1>
        <p className="text-[#666] mb-10 max-w-md mx-auto">
          화면을 클릭해서 기부된 양말이 쌓이는 것을 지켜보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pointer-events-auto">
          <StaticLink href="/products" className="btn-primary">
            양말 구매하기
          </StaticLink>
          <StaticLink href="/story" className="btn-secondary">
            브랜드 스토리
          </StaticLink>
        </div>
      </div>
      
      <div className="absolute inset-0">
        {renderedSocks.map(body => (
            <Sock key={body.id} ref={body.ref} color={body.color!} />
        ))}
      </div>
    </section>
  )
}

export default SockDropHero
