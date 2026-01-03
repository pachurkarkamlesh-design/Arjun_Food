'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  }

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2', className)}>
      {/* Logo Icon - Bowl with location pin */}
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E23744" />
            <stop offset="100%" stopColor="#FF7043" />
          </linearGradient>
          <linearGradient id="bowlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
        </defs>
        
        {/* Main circle */}
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* Bowl shape */}
        <path
          d="M12 22C12 22 12 32 24 32C36 32 36 22 36 22H12Z"
          fill="url(#bowlGradient)"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Steam lines */}
        <path
          d="M17 18C17 18 18 15 17 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M24 17C24 17 25 13 24 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M31 18C31 18 32 15 31 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Location pin dot */}
        <circle cx="24" cy="27" r="3" fill="#E23744" />
        
        {/* Bowl rim */}
        <ellipse
          cx="24"
          cy="22"
          rx="12"
          ry="2"
          fill="white"
          opacity="0.3"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display font-bold tracking-tight',
              sizes[size].text
            )}
          >
            <span className="text-primary-500">Arjun</span>
            <span className="text-dark-900"> Food</span>
            <span className="text-secondary-500">Link</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] text-dark-400 tracking-wider uppercase mt-0.5">
              Campus Food Discovery
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

// Favicon/Small icon version
export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E23744" />
          <stop offset="100%" stopColor="#FF7043" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#logoGradientIcon)" />
      <path
        d="M12 22C12 22 12 32 24 32C36 32 36 22 36 22H12Z"
        fill="white"
      />
      <path d="M17 18C17 18 18 15 17 13" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M24 17C24 17 25 13 24 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 18C31 18 32 15 31 13" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="24" cy="27" r="3" fill="#E23744" />
    </svg>
  )
}
