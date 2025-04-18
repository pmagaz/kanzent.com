import React, { useRef, useEffect, useState } from "react"

// Define color constants
const COLORS = {
  main: '#03395d',
  accent: '#65d0ff',
};

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    if (typeof window === 'undefined') return; // Check for SSR
    
    // Set up scroll event listener
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  useEffect(() => {
    if (typeof window === 'undefined') return; // Check for SSR
    
    const canvas = canvasRef.current
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d")
    let width, height
    let blobs = []
    let time = 0
    
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      
      initBlobs()
    }

    const initBlobs = () => {
      blobs = []
      const blobCount = 15 // Increased blob count for more visible effect
      
      // Create organic blob-like entities
      for (let i = 0; i < blobCount; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 120 + 80, // Larger blobs
          xSpeed: Math.random() * 0.4 - 0.2,
          ySpeed: Math.random() * 0.4 - 0.2,
          baseHue: Math.random() * 30 + 200, // Blue range
          saturation: Math.random() * 40 + 60,
          lightness: Math.random() * 20 + 70,
          alpha: Math.random() * 0.3 + 0.1, // More opacity
          // Random values for organic movement
          angleOffset: Math.random() * Math.PI * 2,
          segments: Math.floor(Math.random() * 5) + 6,
          segmentVariance: Math.random() * 0.4 + 0.2,
          segmentSpeed: Math.random() * 0.003 + 0.001
        })
      }
    }

    const updateBlobs = () => {
      // Calculate normalizedScroll for effects (0 to 1 range)
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const normalizedScroll = Math.min(scrollY / maxScroll, 1)
      
      time += 0.01
      
      blobs.forEach(blob => {
        // When scrolling, modify blob behavior
        const scrollEffect = normalizedScroll * 2
        
        // Default movement pattern when not scrolling
        if (normalizedScroll < 0.05) {
          // Gentle circular motion when not scrolling
          blob.x += Math.sin(time * 0.2 + blob.angleOffset) * 0.5
          blob.y += Math.cos(time * 0.2 + blob.angleOffset) * 0.5
        } else {
          // React to scroll: faster, more dynamic movement
          blob.x += blob.xSpeed * (1 + scrollEffect)
          blob.y += blob.ySpeed * (1 + scrollEffect)
          
          // Add vortex effect toward center when scrolling
          const centerX = width / 2
          const centerY = height / 2
          const dx = centerX - blob.x
          const dy = centerY - blob.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const vortexStrength = normalizedScroll * 0.5
          
          blob.x += (dx / distance) * vortexStrength
          blob.y += (dy / distance) * vortexStrength
          
          // Add some turbulence
          blob.x += Math.sin(time * 5 + blob.y * 0.01) * scrollEffect * 2
          blob.y += Math.cos(time * 5 + blob.x * 0.01) * scrollEffect * 2
        }
        
        // Bounce off edges with damping
        if (blob.x - blob.radius < 0) {
          blob.x = blob.radius
          blob.xSpeed *= -0.8
        } else if (blob.x + blob.radius > width) {
          blob.x = width - blob.radius
          blob.xSpeed *= -0.8
        }
        
        if (blob.y - blob.radius < 0) {
          blob.y = blob.radius
          blob.ySpeed *= -0.8
        } else if (blob.y + blob.radius > height) {
          blob.y = height - blob.radius
          blob.ySpeed *= -0.8
        }
        
        // Apply slight random movement
        blob.xSpeed += (Math.random() - 0.5) * 0.01
        blob.ySpeed += (Math.random() - 0.5) * 0.01
        
        // Limit speed
        const maxSpeed = 0.7 + normalizedScroll
        const speed = Math.sqrt(blob.xSpeed * blob.xSpeed + blob.ySpeed * blob.ySpeed)
        if (speed > maxSpeed) {
          blob.xSpeed = (blob.xSpeed / speed) * maxSpeed
          blob.ySpeed = (blob.ySpeed / speed) * maxSpeed
        }
      })
    }

    const drawScene = () => {
      // Calculate normalizedScroll for visual effects
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const normalizedScroll = Math.min(scrollY / maxScroll, 1)
      
      // Clear canvas with transparent background to not interfere with the hero background
      ctx.clearRect(0, 0, width, height);
      
      // Draw each blob
      blobs.forEach(blob => {
        ctx.save()
        ctx.translate(blob.x, blob.y)
        
        // Shift hue based on scroll position
        const hueShift = normalizedScroll * 40 // Hue shifts as user scrolls
        const currentHue = blob.baseHue + hueShift
        const scrollIntensity = Math.min(0.4 + normalizedScroll * 0.4, 0.8) // Increase intensity with scroll
        
        // Create gradient with increased opacity when scrolling
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.radius)
        gradient.addColorStop(0, `hsla(${currentHue}, ${blob.saturation}%, ${blob.lightness}%, ${blob.alpha + normalizedScroll * 0.3})`)
        gradient.addColorStop(1, `hsla(${currentHue}, ${blob.saturation}%, ${blob.lightness}%, 0)`)
        
        // Draw organic blob shape with dynamic deformation based on scroll
        ctx.beginPath()
        
        for (let i = 0; i <= blob.segments; i++) {
          const angle = (i / blob.segments) * Math.PI * 2
          const segmentTime = time * (blob.segmentSpeed + normalizedScroll * 0.005) + blob.angleOffset
          
          // Increase deformation with scroll
          const scrollDeformation = blob.segmentVariance + normalizedScroll * 0.3
          const radiusOffset = Math.sin(angle * 3 + segmentTime) * blob.radius * scrollDeformation
          const currentRadius = blob.radius + radiusOffset
          
          const x = Math.cos(angle) * currentRadius
          const y = Math.sin(angle) * currentRadius
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Add glow effect when scrolling
        if (normalizedScroll > 0.1) {
          ctx.shadowColor = `hsla(${currentHue}, 90%, 70%, ${normalizedScroll * 0.5})`
          ctx.shadowBlur = 20 * normalizedScroll
          ctx.fill()
        }
        
        ctx.restore()
      })
      
      // Add flowing curves - more dynamic with scroll
      drawFlowingCurves(normalizedScroll)
    }
    
    const drawFlowingCurves = (scrollIntensity) => {
      // We're removing the horizontal lines entirely per user request
      // Instead, we'll enhance the blob animations and interactions
    }

    const animate = () => {
      updateBlobs()
      drawScene()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    // Start animation
    animate()
    
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [scrollY]) // Re-run effect when scroll position changes

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'transparent',
        zIndex: 1
      }} 
    />
  )
}

export default AnimatedBackground