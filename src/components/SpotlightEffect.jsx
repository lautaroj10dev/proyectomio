import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const SpotlightEffect = ({
  containerRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
  enableMagnetism = true
}) => {
  const spotlightRef = useRef(null);
  const magnetismAnimationRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !containerRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-effect';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.4) 0%,
        rgba(${glowColor}, 0.25) 15%,
        rgba(${glowColor}, 0.15) 25%,
        rgba(${glowColor}, 0.1) 40%,
        rgba(${glowColor}, 0.05) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !containerRef.current) return;

      const section = containerRef.current.closest('.spotlight-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = containerRef.current.querySelectorAll('[data-spotlight-card]');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
          if (enableMagnetism) {
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);

        // Magnetismo
        if (enableMagnetism) {
          const magnetX = (e.clientX - centerX) * 0.05;
          const magnetY = (e.clientY - centerY) * 0.05;

          magnetismAnimationRef.current = gsap.to(card, {
            x: magnetX,
            y: magnetY,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 1
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 1
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      containerRef.current?.querySelectorAll('[data-spotlight-card]').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
        if (enableMagnetism) {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [containerRef, disableAnimations, enabled, spotlightRadius, glowColor, enableMagnetism]);

  return null;
};

export default SpotlightEffect;