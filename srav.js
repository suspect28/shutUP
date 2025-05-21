function showProposal() {
    document.getElementById('proposalBox').style.display = 'block';
  }
  
  function handleYes() {
    const messageBox = document.getElementById('finalMessage');
    messageBox.style.display = 'block';
    messageBox.innerHTML = "💍 Yes! You made me the happiest person alive! 💖";
  
    // Pop heart burst
    for (let i = 0; i < 50; i++) {
      createFloatingHeart();
    }
  }
  
  function handleNo() {
    const messageBox = document.getElementById('finalMessage');
    const container = document.getElementById('mainContainer');
  
    messageBox.style.display = 'block';
    messageBox.innerHTML = "😢 Oh no... Please reconsider, I truly love you. 🌹";
  
    // Add shaking effect
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 500);
  }
  
  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '💖';
  
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
  
    document.getElementById('heartContainer').appendChild(heart);
  
    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
  
  // Background heart animation
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let hearts = [];
  
  function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.alpha = 1;
    this.draw = function () {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = "#ff4d6d";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(this.x - this.size, this.y - this.size,
                        this.x - this.size * 2, this.y + this.size,
                        this.x, this.y + this.size * 2);
      ctx.bezierCurveTo(this.x + this.size * 2, this.y + this.size,
                        this.x + this.size, this.y - this.size,
                        this.x, this.y);
      ctx.fill();
      ctx.globalAlpha = 1;
    };
    this.update = function () {
      this.y -= this.speed;
      this.alpha -= 0.005;
    };
  }
  
  function createHeart() {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 20;
    const size = Math.random() * 10 + 10;
    const speed = Math.random() * 1 + 0.5;
    hearts.push(new Heart(x, y, size, speed));
  }
  
  function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
      heart.update();
      heart.draw();
      if (heart.alpha <= 0) hearts.splice(index, 1);
    });
    createHeart();
    requestAnimationFrame(animateHearts);
  }
  
  animateHearts();
  