function setupEnhancedNavigationGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>🏞️ The Ochre Expedition</strong><br>
    Navigate platforms to collect ochre. Use <kbd>← →</kbd> to move, <kbd>Space</kbd> to jump!
  `;
  
  // Create platformer-style game
  container.innerHTML = '';
  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #B4D7E8 50%, #D4A574 100%)';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  
  const containerRect = container.getBoundingClientRect();
  const CONTAINER_HEIGHT = containerRect.height || 400;
  const CONTAINER_WIDTH = containerRect.width || 800;
  
  // UI
  const uiContainer = document.createElement('div');
  uiContainer.className = 'stat-bar-container';
  uiContainer.innerHTML = `
    <div class="stat-bar">
      <div class="stat-bar-label">Progress</div>
      <div style="background: rgba(0,0,0,0.5); border-radius: 4px; padding: 8px; color: white; font-weight: bold; text-align: center;" id="collected-count">0 / 12 deposits</div>
    </div>
  `;
  container.appendChild(uiContainer);
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
  `;
  
  // Create platforms
  const platforms = [];
  
  // Ground platform
  const ground = {
    x: 0,
    y: CONTAINER_HEIGHT - 60,
    width: CONTAINER_WIDTH * 2,
    height: 60
  };
  const groundEl = document.createElement('div');
  groundEl.style.cssText = `
    position: absolute;
    left: ${ground.x}px;
    top: ${ground.y}px;
    width: ${ground.width}px;
    height: ${ground.height}px;
    background: linear-gradient(180deg, #8B7355 0%, #6B5842 100%);
    z-index: 5;
  `;
  container.appendChild(groundEl);
  platforms.push(ground);
  
  // Platform 1 (low)
  const plat1 = { x: 250, y: CONTAINER_HEIGHT - 140, width: 150, height: 20 };
  const plat1El = document.createElement('div');
  plat1El.style.cssText = `
    position: absolute; left: ${plat1.x}px; top: ${plat1.y}px;
    width: ${plat1.width}px; height: ${plat1.height}px;
    background: linear-gradient(180deg, #A0825A 0%, #8B7355 100%);
    z-index: 5; border-radius: 4px 4px 0 0;
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  `;
  container.appendChild(plat1El);
  platforms.push(plat1);
  
  // Platform 2 (mid)
  const plat2 = { x: 480, y: CONTAINER_HEIGHT - 200, width: 180, height: 20 };
  const plat2El = document.createElement('div');
  plat2El.style.cssText = `
    position: absolute; left: ${plat2.x}px; top: ${plat2.y}px;
    width: ${plat2.width}px; height: ${plat2.height}px;
    background: linear-gradient(180deg, #CD853F 0%, #A0714A 100%);
    z-index: 5; border-radius: 4px 4px 0 0;
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  `;
  container.appendChild(plat2El);
  platforms.push(plat2);
  
  // Platform 3 (high)
  const plat3 = { x: 720, y: CONTAINER_HEIGHT - 260, width: 160, height: 20 };
  const plat3El = document.createElement('div');
  plat3El.style.cssText = `
    position: absolute; left: ${plat3.x}px; top: ${plat3.y}px;
    width: ${plat3.width}px; height: ${plat3.height}px;
    background: linear-gradient(180deg, #CD853F 0%, #A0714A 100%);
    z-index: 5; border-radius: 4px 4px 0 0;
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  `;
  container.appendChild(plat3El);
  platforms.push(plat3);
  
  // Platform 4 (far right)
  const plat4 = { x: 980, y: CONTAINER_HEIGHT - 180, width: 200, height: 20 };
  const plat4El = document.createElement('div');
  plat4El.style.cssText = `
    position: absolute; left: ${plat4.x}px; top: ${plat4.y}px;
    width: ${plat4.width}px; height: ${plat4.height}px;
    background: linear-gradient(180deg, #A0825A 0%, #8B7355 100%);
    z-index: 5; border-radius: 4px 4px 0 0;
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  `;
  container.appendChild(plat4El);
  platforms.push(plat4);
  
  // Character
  const character = document.createElement('div');
  character.className = 'character-sprite platformer-char';
  character.style.position = 'absolute';
  character.style.width = '28px';
  character.style.height = '40px';
  character.style.zIndex = '20';
  container.appendChild(character);
  
  // Physics state
  let charX = 80;
  let charY = ground.y - 40;
  let velocityX = 0;
  let velocityY = 0;
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -12;
  const MOVE_SPEED = 4;
  const MAX_FALL_SPEED = 15;
  let isGrounded = false;
  let canJump = true;
  
  // Input state
  const keys = { left: false, right: false, jump: false };
  
  // Jump sound
  const jumpSound = new Audio('SoundsForTMCAE/Minigame/Red ochre/Jump.wav');
  jumpSound.volume = 0.6;
  
  // Deposits system
  const deposits = [];
  let totalCollected = 0;
  const TOTAL_DEPOSITS = 12;
  
  function createDeposit(x, y) {
    const el = document.createElement('div');
    const qualityRoll = Math.random();
    const quality = qualityRoll > 0.7 ? 'high' : (qualityRoll > 0.4 ? 'medium' : 'low');
    const mult = quality === 'high' ? 3 : (quality === 'medium' ? 2 : 1);
    const icon = quality === 'high' ? '🔴' : (quality === 'medium' ? '🟠' : '🟤');
    
    el.className = 'resource-deposit platformer-deposit';
    el.innerHTML = icon;
    el.style.cssText = `
      position: absolute; left: ${x}px; top: ${y}px;
      width: 30px; height: 30px; z-index: 15;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    `;
    el.dataset.multiplier = mult;
    el.dataset.collected = 'false';
    container.appendChild(el);
    deposits.push({ el, x, y, mult });
    return el;
  }
  
  // Place deposits on/near platforms
  createDeposit(120, ground.y - 35);
  createDeposit(400, ground.y - 35);
  createDeposit(plat1.x + 50, plat1.y - 35);
  createDeposit(plat1.x + 100, plat1.y - 35);
  createDeposit(plat2.x + 40, plat2.y - 35);
  createDeposit(plat2.x + 100, plat2.y - 35);
  createDeposit(plat2.x + 140, plat2.y - 35);
  createDeposit(plat3.x + 50, plat3.y - 35);
  createDeposit(plat3.x + 110, plat3.y - 35);
  createDeposit(plat4.x + 60, plat4.y - 35);
  createDeposit(plat4.x + 130, plat4.y - 35);
  createDeposit(900, ground.y - 35);
  
  function checkPlatformCollision() {
    const charBottom = charY + 40;
    const charTop = charY;
    const charLeft = charX;
    const charRight = charX + 28;
    
    isGrounded = false;
    
    for (const plat of platforms) {
      // Check if character is falling onto platform from above
      if (velocityY >= 0 &&
          charBottom >= plat.y && charBottom <= plat.y + 15 &&
          charRight > plat.x && charLeft < plat.x + plat.width) {
        charY = plat.y - 40;
        velocityY = 0;
        isGrounded = true;
        canJump = true;
        break;
      }
    }
    
    return isGrounded;
  }
  
  function checkDepositCollision() {
    const charCenterX = charX + 14;
    const charCenterY = charY + 20;
    
    deposits.forEach(dep => {
      if (dep.el.dataset.collected === 'true') return;
      const depCenterX = dep.x + 15;
      const depCenterY = dep.y + 15;
      const dist = Math.sqrt((charCenterX - depCenterX)**2 + (charCenterY - depCenterY)**2);
      
      if (dist < 32) {
        dep.el.dataset.collected = 'true';
        dep.el.style.transform = 'scale(1.4)';
        dep.el.style.opacity = '0.4';
        setTimeout(() => { try { dep.el.remove(); } catch(e){} }, 250);
        
        totalCollected++;
        miniGameState.totalMultiplier = (miniGameState.totalMultiplier || 0) + dep.mult;
        document.getElementById('collected-count').textContent = `${totalCollected} / ${TOTAL_DEPOSITS} deposits`;
        showNotification(`✓ Ochre (+${dep.mult}x)`, 800);
        
        if (totalCollected >= TOTAL_DEPOSITS) {
          setTimeout(() => endMiniGame(true), 600);
        }
      }
    });
  }
  
  // Game loop
  function gameLoop() {
    if (!miniGameState.active) return;
    
    // Apply gravity
    if (!isGrounded) {
      velocityY += GRAVITY;
      if (velocityY > MAX_FALL_SPEED) velocityY = MAX_FALL_SPEED;
    }
    
    // Horizontal movement
    if (keys.left) {
      velocityX = -MOVE_SPEED;
      character.style.transform = 'scaleX(-1)';
    } else if (keys.right) {
      velocityX = MOVE_SPEED;
      character.style.transform = 'scaleX(1)';
    } else {
      velocityX = 0;
    }
    
    // Jump
    if (keys.jump && canJump && isGrounded) {
      velocityY = JUMP_STRENGTH;
      isGrounded = false;
      canJump = false;
      // Play jump sound
      jumpSound.currentTime = 0;
      jumpSound.play().catch(e => console.log('Jump sound play failed:', e));
    }
    
    // Update position
    charX += velocityX;
    charY += velocityY;
    
    // Bounds
    if (charX < 0) charX = 0;
    if (charX > CONTAINER_WIDTH * 2 - 28) charX = CONTAINER_WIDTH * 2 - 28;
    if (charY > CONTAINER_HEIGHT) charY = ground.y - 40; // Safety reset
    
    // Collisions
    checkPlatformCollision();
    checkDepositCollision();
    
    // Update visuals
    character.style.left = charX + 'px';
    character.style.top = charY + 'px';
    
    // Camera follow (scroll container)
    const cameraX = Math.max(0, Math.min(charX - CONTAINER_WIDTH / 2, CONTAINER_WIDTH));
    container.scrollLeft = cameraX;
    
    requestAnimationFrame(gameLoop);
  }
  
  // Input handlers
  function handleKeyDown(e) {
    if (!miniGameState.active) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') { keys.left = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd') { keys.right = true; e.preventDefault(); }
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { keys.jump = true; e.preventDefault(); }
  }
  
  function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { keys.jump = false; canJump = true; }
  }
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  // Start game loop
  gameLoop();
}
