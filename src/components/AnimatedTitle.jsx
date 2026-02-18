import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const AnimatedTitle = ({
  text,
  splitDelay = 50,
  splitDuration = 1.25,
  shinySpeed = 3,
  shinyColor = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = shinySpeed * 1000;

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // Animación del split
  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;

      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      let targets;
      const assignTargets = self => {
        if (self.chars.length) targets = self.chars;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: 'chars',
        smartWrap: true,
        autoSplit: false,
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: splitDuration,
              ease: 'power3.out',
              stagger: splitDelay / 1000,
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [text, splitDelay, splitDuration, fontsLoaded],
      scope: ref
    }
  );

  // Animación del shiny
  useAnimationFrame(time => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    const cycleDuration = animationDuration;
    const cycleTime = elapsedRef.current % cycleDuration;

    const p = (cycleTime / animationDuration) * 100;
    progress.set(p);
  });

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${shinyColor} 0%, ${shinyColor} 35%, ${shineColor} 50%, ${shinyColor} 65%, ${shinyColor} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.h1
      ref={ref}
      style={{
        ...gradientStyle,
        backgroundPosition,
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '2px',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity'
      }}
      className="animated-title"
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedTitle;