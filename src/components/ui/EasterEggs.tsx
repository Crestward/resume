'use client';

import { useEffect, useState } from 'react';
import './EasterEggs.css';

export default function EasterEggs() {
  const [devModeActivated, setDevModeActivated] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  useEffect(() => {
    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKonamiCode = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;

          // Show notification
          showNotification('🎮 Konami Code Activated! Matrix mode enabled!');

          // Activate matrix effect
          setMatrixMode(true);

          setTimeout(() => {
            setMatrixMode(false);
          }, 10000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    // Developer Mode: Type "dev" anywhere
    let devModeKeys: string[] = [];
    const handleDevMode = (e: KeyboardEvent) => {
      devModeKeys.push(e.key.toLowerCase());

      if (devModeKeys.length > 3) {
        devModeKeys.shift();
      }

      if (devModeKeys.join('') === 'dev') {
        setDevModeActivated((prev) => !prev);
        showNotification(
          devModeActivated
            ? '🔧 Developer Mode Deactivated'
            : '🔧 Developer Mode Activated! Press F12 to see console logs.'
        );
        devModeKeys = [];
      }
    };

    // Secret click easter egg on logo
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout | null = null;

    const handleLogoClick = () => {
      clickCount++;

      if (clickTimer) clearTimeout(clickTimer);

      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 2000);

      if (clickCount === 5) {
        showNotification('🎨 Rainbow Mode Activated!');
        document.body.classList.add('rainbow-mode');
        setTimeout(() => {
          document.body.classList.remove('rainbow-mode');
        }, 5000);
        clickCount = 0;
      }
    };

    const logos = document.querySelectorAll('img[src*="logo"]');
    logos.forEach((logo) => {
      logo.addEventListener('click', handleLogoClick);
    });

    window.addEventListener('keydown', handleKonamiCode);
    window.addEventListener('keydown', handleDevMode);

    // Log developer mode status
    if (devModeActivated) {
      console.log('%c🔧 Developer Mode Active', 'font-size: 20px; color: #10B981; font-weight: bold;');
      console.log('%cYou discovered the secret developer mode!', 'font-size: 14px; color: #3B82F6;');
      console.log('%cPress "dev" again to deactivate.', 'font-size: 12px; color: #9CA3AF;');
    }

    return () => {
      window.removeEventListener('keydown', handleKonamiCode);
      window.removeEventListener('keydown', handleDevMode);
      logos.forEach((logo) => {
        logo.removeEventListener('click', handleLogoClick);
      });
    };
  }, [devModeActivated]);

  return (
    <>
      {matrixMode && <MatrixRain />}
      {devModeActivated && <DevModeIndicator />}
    </>
  );
}

function showNotification(message: string) {
  const notification = document.createElement('div');
  notification.className = 'easter-egg-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);
  }, []);

  return <canvas id="matrix-canvas" className="matrix-canvas" />;
}

function DevModeIndicator() {
  return (
    <div className="dev-mode-indicator">
      <div className="dev-mode-icon">🔧</div>
      <div className="dev-mode-text">DEV MODE</div>
    </div>
  );
}
