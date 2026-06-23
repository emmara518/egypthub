'use client';

export default function SandWave({ flip }: { flip?: boolean }) {
  return (
    <div className="sand-wave" style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="var(--bg)">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </div>
  );
}
