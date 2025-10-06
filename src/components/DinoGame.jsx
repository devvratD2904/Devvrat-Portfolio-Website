import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import all game assets
import jumpImg from '../assets/images/game/jump_pixel.png';
import leftRunImg from '../assets/images/game/left_run_pixel.png';
import rightRunImg from '../assets/images/game/right_run_pixel.png';
import standingImg from '../assets/images/game/standing_pixel.png';

// Import obstacle images
import bossImg from '../assets/images/game/boss_pixel.png';
import evilMeImg from '../assets/images/game/evil_me_pixel.png';
import girlImg from '../assets/images/game/girl_pixel.png';
import ninjaImg from '../assets/images/game/ninja_pixel.png';
import tRexImg from '../assets/images/game/t_rex_pixel.png';
import teacherImg from '../assets/images/game/teacher_pixel.png';

// Create a map of image names to imported images
const imageAssets = {
  'jump_pixel': jumpImg,
  'left_run_pixel': leftRunImg,
  'right_run_pixel': rightRunImg,
  'standing_pixel': standingImg,
  'boss_pixel': bossImg,
  'evil_me_pixel': evilMeImg,
  'girl_pixel': girlImg,
  'ninja_pixel': ninjaImg,  // Corrected from 'nija_pixel' to 'ninja_pixel'
  't_rex_pixel': tRexImg,
  'teacher_pixel': teacherImg
};

const DinoGame = () => {
  const navigate = useNavigate();
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('dinoHighScore')) || 0;
  });
  const [gameSpeed, setGameSpeed] = useState(8);
  
  // Refs for game elements
  const dinoRef = useRef(null);
  const gameContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const lastObstacleTimeRef = useRef(0);
  const obstacleIntervalRef = useRef(2000); // Start with 2 seconds between obstacles
  
  // Character states
  const [isJumping, setIsJumping] = useState(false);
  const [characterPosition, setCharacterPosition] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Game elements dimensions
  const [dimensions, setDimensions] = useState({
    dinoWidth: 80,
    dinoHeight: 80,
    groundHeight: 80,
    gameWidth: 0,
    gameHeight: 400,
    jumpHeight: 100, // Maximum jump height in pixels
  });
  
  // Obstacles
  const obstacleTypes = ['boss_pixel', 'evil_me_pixel', 'girl_pixel', 'ninja_pixel', 't_rex_pixel', 'teacher_pixel'];
  
  // Character animation frames
  const frameRate = 10; // Frames per second for character animation
  
  // Start the game
  const startGame = useCallback(() => {
    console.log('Starting game...');
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setGameSpeed(8);
    setObstacles([]);
    lastTimeRef.current = performance.now();
    lastObstacleTimeRef.current = 0;
    obstacleIntervalRef.current = 2000; // Reset obstacle interval
    
    // Set initial dimensions
    if (gameContainerRef.current) {
      const rect = gameContainerRef.current.getBoundingClientRect();
      console.log('Game container dimensions:', rect);
      setDimensions(prev => ({
        ...prev,
        gameWidth: rect.width,
        gameHeight: rect.height
      }));
    } else {
      console.error('Game container ref is not set');
    }
  }, []);

  // Jump mechanics
  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      console.log('Initiating jump...');
      
      if (!gameStarted) {
        startGame();
        return;
      }
      
      setIsJumping(true);
      let jumpHeight = 0;
      const gravity = 1.5; // Higher gravity for snappier jump
      let velocity = 20; // Higher initial velocity for more responsive jump
      let lastTimestamp = performance.now();
      
      const jumpAnimation = (timestamp) => {
        if (gameOver) {
          setIsJumping(false);
          return;
        }
        
        const deltaTime = (timestamp - lastTimestamp) / 16; // Normalize to ~60fps
        lastTimestamp = timestamp;
        
        // Apply gravity and update position
        velocity -= gravity * deltaTime;
        jumpHeight = Math.max(0, jumpHeight + velocity);
        
        // Check if landed
        if (jumpHeight <= 0) {
          jumpHeight = 0;
          setIsJumping(false);
          return;
        }
        
        setCharacterPosition(jumpHeight);
        animationFrameRef.current = requestAnimationFrame(jumpAnimation);
      };
      
      // Start the jump animation
      animationFrameRef.current = requestAnimationFrame(jumpAnimation);
      console.log('Jump animation started');
    } else {
      console.log('Cannot jump - isJumping:', isJumping, 'gameOver:', gameOver);
    }
  }, [isJumping, gameOver, gameStarted, startGame]);
  
  // Handle user input
  const handleKeyDown = useCallback((e) => {
    // Handle space, up arrow, or W key for jumping
    if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      jump();
    }
  }, [jump]);
  
  // Handle touch input
  const handleTouch = useCallback((e) => {
    e.preventDefault();
    console.log('Touch detected!');
    if (!gameOver) {
      if (!gameStarted) {
        startGame();
      } else {
        jump();
      }
    } else {
      // Restart game if game over
      setGameOver(false);
      setScore(0);
      setObstacles([]);
      setGameStarted(true);
    }
  }, [gameOver, gameStarted, jump, startGame, setObstacles]);
  
  
  // Get current character frame
  const getCharacterFrame = () => {
    if (isJumping || gameOver) return 'jump_pixel';
    if (!gameStarted) return 'standing_pixel';
    
    // Alternate between left and right run sprites
    const now = Date.now();
    const frameDuration = 200; // milliseconds per frame
    return Math.floor(now / frameDuration) % 2 === 0 ? 'right_run_pixel' : 'left_run_pixel';
  };

  // Game loop
  const gameLoop = useCallback((timestamp) => {
    if (!gameStarted || gameOver) return;
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Update score - simpler scoring based on time survived
    setScore(prevScore => {
      const newScore = prevScore + Math.floor(deltaTime / 100);
      
      // Increase difficulty as score increases
      if (newScore > 0 && newScore % 100 === 0) {
        setGameSpeed(prevSpeed => Math.min(prevSpeed + 0.5, 20));
        // Make obstacles appear faster as score increases
        obstacleIntervalRef.current = Math.max(800, 2000 - (newScore * 1.5));
      }
      
      return newScore;
    });
    
    // Generate obstacles
    if (timestamp - lastObstacleTimeRef.current > obstacleIntervalRef.current) {
      const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      const newObstacle = {
        id: Date.now(),
        type: randomType,
        position: dimensions.gameWidth, // Start from right edge
        passed: false
      };
      
      setObstacles(prevObstacles => [...prevObstacles, newObstacle]);
      lastObstacleTimeRef.current = timestamp;
    }
    
    // Update obstacles
    setObstacles(prevObstacles => {
      const newObstacles = prevObstacles
        .map(obstacle => ({
          ...obstacle,
          position: obstacle.position - (gameSpeed * deltaTime / 16)
        }))
        .filter(obstacle => obstacle.position > -100); // Remove obstacles well off screen
      
      return newObstacles;
    });
    
    // Check for collisions
    if (dinoRef.current) {
      const dinoRect = dinoRef.current.getBoundingClientRect();
      
      // Get all obstacle elements
      const obstacleElements = document.querySelectorAll('[id^="obstacle-"]');
      
      obstacleElements.forEach(element => {
        const obstacleRect = element.getBoundingClientRect();
        
        // Improved collision detection with some padding
        const collisionPadding = 10;
        if (
          dinoRect.right - collisionPadding > obstacleRect.left + collisionPadding &&
          dinoRect.left + collisionPadding < obstacleRect.right - collisionPadding &&
          dinoRect.bottom - collisionPadding > obstacleRect.top + collisionPadding &&
          dinoRect.top + collisionPadding < obstacleRect.bottom - collisionPadding
        ) {
          // Collision detected
          if (!gameOver) {
            setHighScore(prevHighScore => {
              const newHighScore = Math.max(prevHighScore, score);
              localStorage.setItem('dinoHighScore', newHighScore.toString());
              return newHighScore;
            });
            
            // Visual feedback for collision
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 100);
            
            setGameOver(true);
          }
        }
      });
    }
    
    if (!gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameStarted, gameOver, gameSpeed, dimensions.gameWidth, score]);
  
  // Set up game loop and event listeners
  useEffect(() => {
    console.log('Setting up game loop, gameStarted:', gameStarted, 'gameOver:', gameOver);
    
    // Initialize game container dimensions
    const updateDimensions = () => {
      if (gameContainerRef.current) {
        const rect = gameContainerRef.current.getBoundingClientRect();
        console.log('Updating dimensions:', rect);
        setDimensions(prev => ({
          ...prev,
          gameWidth: rect.width,
          gameHeight: rect.height
        }));
      } else {
        console.error('Game container ref is not set in updateDimensions');
      }
    };
    
    // Initial dimension setup
    updateDimensions();
    
    // Handle window resize
    window.addEventListener('resize', updateDimensions);
    
    // Start game loop if game is running
    if (gameStarted && !gameOver) {
      console.log('Starting game loop');
      lastTimeRef.current = performance.now();
      const frameId = requestAnimationFrame(gameLoop);
      animationFrameRef.current = frameId;
      console.log('Animation frame ID:', frameId);
    } else {
      console.log('Not starting game loop. gameStarted:', gameStarted, 'gameOver:', gameOver);
    }
    
    // Cleanup
    return () => {
      console.log('Cleaning up game loop');
      window.removeEventListener('resize', updateDimensions);
      if (animationFrameRef.current) {
        console.log('Cancelling animation frame:', animationFrameRef.current);
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop]);
  
  // Event listeners
  useEffect(() => {
    const gameContainer = gameContainerRef.current;
    
    // Keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    
    // Touch controls
    if (gameContainer) {
      gameContainer.addEventListener('touchstart', handleTouch, { passive: false });
      gameContainer.addEventListener('click', handleTouch);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameContainer) {
        gameContainer.removeEventListener('touchstart', handleTouch);
        gameContainer.removeEventListener('click', handleTouch);
      }
    };
  }, [handleKeyDown, handleTouch]);
  
  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dino Runner</h1>
          <button 
            onClick={handleBackToHome}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center bg-slate-900 relative overflow-hidden">
        <div 
          ref={gameContainerRef}
          className="relative w-full h-full max-w-4xl mx-auto bg-slate-800"
          style={{
            height: `${dimensions.gameHeight}px`,
            maxHeight: '80vh',
          }}
        >
          {/* Ground */}
          <div 
            className="absolute bottom-0 left-0 w-full bg-green-700" 
            style={{ height: `${dimensions.groundHeight}px` }}
          />
          
          {/* Character */}
          <motion.div
            ref={dinoRef}
            className={`absolute left-16 bg-contain bg-no-repeat bg-center ${isBlinking ? 'opacity-50' : 'opacity-100'}`}
            style={{
              width: `${dimensions.dinoWidth}px`,
              height: `${dimensions.dinoHeight}px`,
              bottom: `${dimensions.groundHeight}px`,
              backgroundImage: `url(${imageAssets[getCharacterFrame()]})`,
              transform: `translateY(-${characterPosition}px)`,
              imageRendering: 'pixelated',
              backgroundSize: 'contain',
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            animate={{
              scale: gameStarted && !isJumping ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 0.8,
              repeat: gameStarted && !isJumping ? Infinity : 0,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 100,
              damping: 10
            }}
          />
          
          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="absolute bg-contain bg-no-repeat bg-bottom"
              style={{
                width: '60px',
                height: '60px',
                bottom: `${dimensions.groundHeight}px`,
                left: `${obstacle.position}px`,
                backgroundImage: `url(${imageAssets[obstacle.type]})`,
                imageRendering: 'pixelated',
                willChange: 'transform',
                transformStyle: 'preserve-3d'
              }}
            />
          ))}
          
          {/* Start Screen */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-20">
              <h2 className="text-4xl font-bold mb-6">Dino Runner</h2>
              <p className="text-xl mb-8">Press SPACE, UP ARROW or TAP to jump</p>
              <button 
                onClick={startGame}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold transition-colors transform hover:scale-105 active:scale-95"
              >
                Start Game
              </button>
            </div>
          )}
          
          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50 p-6">
              <motion.div 
                className="bg-slate-800 rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Game Over!
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-2xl text-slate-200">
                    Your Score: <span className="text-yellow-400 font-bold">{score}</span>
                  </p>
                  <p className="text-xl text-slate-300">
                    High Score: <span className="text-green-400 font-bold">{Math.max(score, highScore)}</span>
                  </p>
                </div>
                <div className="flex flex-col space-y-4">
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold transition-colors transform hover:scale-105 active:scale-95"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={handleBackToHome}
                    className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-lg transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Score Display */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-xl font-mono">
            Score: {score}
          </div>
          
          {/* High Score Display */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-lg font-mono">
            High Score: {highScore}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoGame;
