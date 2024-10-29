// Fireworks.js
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Fireworks = () => {
  const particlesInit = async (main) => {
    // Load tsparticles package
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log("Particles loaded successfully");
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ff0000",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: 5,
            random: true,
          },
          move: {
            enable: true,
            speed: 3,
          },
        },
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            push: { particles_nb: 4 },
            repulse: { distance: 100, duration: 1 },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default Fireworks;
