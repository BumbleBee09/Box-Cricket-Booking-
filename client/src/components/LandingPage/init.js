import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Animation = (animationContainer,ballRef) => {
    useEffect(() => {
        let scene, camera, renderer, ball, animationFrameId;
    
        const init = () => {
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(75, animationContainer.current.offsetWidth / animationContainer.current.offsetHeight, 0.1, 1000);
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(animationContainer.current.offsetWidth, animationContainer.current.offsetHeight);
          animationContainer.current.appendChild(renderer.domElement);
    
          // Set the background color of the renderer to sky color (light blue)
          renderer.setClearColor(0x87CEEB, 0); // Use 0x87CEEB for sky color
    
          // Create a cricket pitch (a green plane)
          const pitchGeometry = new THREE.PlaneGeometry(10, 10);
          const pitchMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 }); // Green color
          const pitch = new THREE.Mesh(pitchGeometry, pitchMaterial);
          pitch.rotation.x = -Math.PI / 2; // Rotate it to be horizontal
          scene.add(pitch);
    
          // Create the stumps
          const stumpGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
          const stumpMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // White color
    
          const stump1 = new THREE.Mesh(stumpGeometry, stumpMaterial);
          stump1.position.set(0, 3.8, 5);
          scene.add(stump1);
    
          const stump2 = new THREE.Mesh(stumpGeometry, stumpMaterial);
          stump2.position.set(0.2, 3.8, 5);
          scene.add(stump2);
    
          const stump3 = new THREE.Mesh(stumpGeometry, stumpMaterial);
          stump3.position.set(-0.2, 3.8, 5);
          scene.add(stump3);
    
          // Create the bails
          const bailGeometry = new THREE.BoxGeometry(0.34, 0.05, 0.05);
          const bailMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 }); // White color
    
          const bail1 = new THREE.Mesh(bailGeometry, bailMaterial);
          bail1.position.set(-0.2, 4.2, 4);
          scene.add(bail1);
    
          const bail2 = new THREE.Mesh(bailGeometry, bailMaterial);
          bail2.position.set(0.2, 4.2, 4);
          scene.add(bail2);
    
          // Create nets
          const netMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 }); // White, semi-transparent
    
          // Top net
          const topNetGeometry = new THREE.BoxGeometry(10.2, 0.1, 10);
          const topNet = new THREE.Mesh(topNetGeometry, netMaterial);
          topNet.position.y = 4.1;
          scene.add(topNet);
    
          // Left net
          const leftNetGeometry = new THREE.BoxGeometry(10.2, 4.5, 0.1);
          const leftNet = new THREE.Mesh(leftNetGeometry, netMaterial);
          leftNet.position.x = -5.1;
          leftNet.position.y = 1.8;
          leftNet.rotation.y = Math.PI / 2;
          scene.add(leftNet);
    
          // Right net
          const rightNetGeometry = new THREE.BoxGeometry(10.2, 4.5, 0.1);
          const rightNet = new THREE.Mesh(rightNetGeometry, netMaterial);
          rightNet.position.x = 5.1;
          rightNet.position.y = 1.8;
          rightNet.rotation.y = Math.PI / 2;
          scene.add(rightNet);
    
          // Back net
          const backNetGeometry = new THREE.BoxGeometry(10.2, 4.5, 0.1);
          const backNet = new THREE.Mesh(backNetGeometry, netMaterial);
          backNet.position.z = -5.1;
          scene.add(backNet);
    
          // Create a cricket ball
          const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
          const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
          ball = new THREE.Mesh(ballGeometry, ballMaterial);
          scene.add(ball);
    
          // Position the ball initially
          ball.position.set(0, 0.2, 5);
    
          // Position the camera
          camera.position.set(0, 5, 10);
          camera.lookAt(0, 0, 0);

  
    
          animate();
        };
    
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
    
          // Move the ball horizontally (as a bowler throws)
          //ball.position.x += 0.01;
          ball.position.y+=0.01;
    
          // Check if the ball reaches the pitch
          if (ball.position.y >= 50 && ball.position.y <= 5) {
            // Calculate the bounce height based on the position on the pitch
            const bounceHeight = Math.sin((ball.position.y + 5) / 10 * Math.PI) + 0.2;
            ball.position.y = bounceHeight;
          }
    
          // Check if the ball goes past the stumps
          if (ball.position.y > 8) {
            // Ball passed the stumps, you can add your logic here
            console.log("Ball passed the stumps!");
            // Reset ball position
            ball.position.set(0, 0.2, 5);
          }
    
          renderer.render(scene, camera);
        };
    
        init();
    
        return () => {
          // Clean up Three.js resources when the component unmounts
          cancelAnimationFrame(animationFrameId);
          renderer.dispose();
        };
      }, [animationContainer]);
};