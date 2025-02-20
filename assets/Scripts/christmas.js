const christmas = document.getElementById('christmas');
const ctx = christmas.getContext('2d');
const W = window.innerWidth;
const H = window.innerHeight;
christmas.width = W;
christmas.height = H;

const particles = [];
const images = [];
const snowParticleCount = 50;
const imageParticleCount = 10;
const imgSrcs = [
    "https://cdn-icons-png.flaticon.com/512/9004/9004955.png",
    "https://cdn-icons-png.flaticon.com/512/9004/9004922.png",
    "https://cdn-icons-png.flaticon.com/512/9004/9004824.png",
    "https://cdn-icons-png.flaticon.com/512/9004/9004953.png",
    "https://cdn-icons-png.flaticon.com/512/9004/9004896.png"
];

const loadedImages = imgSrcs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

function createSnowParticle() {
    return {
        type: "snow",
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() * (2 - 0.75) + 0.75) * (Math.random() < 0.75 ? -1 : 1),
        vy: Math.random() * (2 - 0.75) + 0.75,
        radius: Math.random() * (3 - 1) + 1,
        alpha: Math.random() * 1 + 0.5
    };
}

function createImageParticle() {
    return {
        type: "image",
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() * (2 - 0.75) + 0.75) * (Math.random() < 0.75 ? -1 : 1),
        vy: Math.random() * (2 - 0.75) + 0.75,
        size: Math.random() * 10 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.05 - 0.025,
        img: loadedImages[Math.floor(Math.random() * loadedImages.length)]
    };
}

for (let i = 0; i < snowParticleCount; i++) {
    particles.push(createSnowParticle());
}

for (let i = 0; i < imageParticleCount; i++) {
    images.push(createImageParticle());
}

function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = W + p.radius;
        if (p.y > H + p.radius) p.y = -p.radius;
    });

    images.forEach(p => {
        ctx.save();
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);
        ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) {
            p.x = W + p.size;
        } else if (p.x > W + p.size) {
            p.x = -p.size;
        }
        if (p.y > H + p.size) {
            p.y = -p.size;
            p.x = Math.random() * W;
        }
    });

    requestAnimationFrame(draw);
}

Promise.all(loadedImages.map(img => new Promise(resolve => img.onload = resolve)))
    .then(() => {
        draw();
    });

window.addEventListener('resize', () => {
    christmas.width = W = window.innerWidth;
    christmas.height = H = window.innerHeight;
});