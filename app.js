// Global variables
let selectedImages = [];
let selectedStyle = 'grid';
let streamActive = null;

// Merge styles definitions
const mergeStyles = {
    grid: { name: '🔳 Grid', icon: '⬚' },
    horizontal: { name: '➡️ Horizontal', icon: '▬' },
    vertical: { name: '⬇️ Vertical', icon: '▮' },
    circle: { name: '⭕ Circle', icon: '●' },
    spiral: { name: '🌀 Spiral', icon: '⛰' },
    diamond: { name: '💎 Diamond', icon: '◆' },
    hexagon: { name: '⬡ Hexagon', icon: '⬡' },
    star: { name: '⭐ Star', icon: '★' },
    heart: { name: '❤️ Heart', icon: '♥' },
    flower: { name: '🌸 Flower', icon: '❀' },
    butterfly: { name: '🦋 Butterfly', icon: '🦋' },
    mosaic: { name: '🧩 Mosaic', icon: '⊞' },
    collage: { name: '📐 Collage', icon: '◼' },
    puzzle: { name: '🧩 Puzzle', icon: '◻' },
    cascade: { name: '🌊 Cascade', icon: '≈' },
    fan: { name: '📂 Fan', icon: '⊕' },
    layers: { name: '📚 Layers', icon: '▬' },
    sine: { name: '〰️ Sine Wave', icon: '～' },
    twist: { name: '🌪️ Twist', icon: '◌' },
    dna: { name: '🧬 DNA', icon: '≈' },
    gallery: { name: '🖼️ Gallery', icon: '▭' },
    frame: { name: '🖼 Frame', icon: '▬' },
    corners: { name: '🔲 Corners', icon: '✚' },
    concentric: { name: '⭕ Concentric', icon: '◯' },
    checkerboard: { name: '🔲 Checkerboard', icon: '■' },
    infinity: { name: '∞ Infinity', icon: '∞' },
    mandala: { name: '✡️ Mandala', icon: '✡' },
    peacock: { name: '🦚 Peacock', icon: '🦚' },
    overlap: { name: '➕ Overlap', icon: '⊕' },
    random: { name: '🎲 Random', icon: '??' },
    artistic: { name: '🎨 Artistic', icon: '◈' },
    mirror: { name: '🪞 Mirror', icon: '⇄' },
    wave: { name: '〰️ Wave', icon: '≋' },
    stack: { name: '📦 Stack', icon: '▮' },
    radial: { name: '⚪ Radial', icon: '⊙' },
    cross: { name: '✝️ Cross', icon: '✚' },
    diagonal: { name: '↗️ Diagonal', icon: '╱' },
    zigzag: { name: '⚡ Zigzag', icon: '⚡' },
    sunburst: { name: '☀️ Sunburst', icon: '✶' },
    tree: { name: '🌳 Tree', icon: '🌳' },
    cloud: { name: '☁️ Cloud', icon: '☁' },
    wave2: { name: '🌊 Wave2', icon: '∿' },
    matrix: { name: '📊 Matrix', icon: '▦' },
    honeycomb: { name: '🐝 Honeycomb', icon: '⬡' },
    rainbow: { name: '🌈 Rainbow', icon: '⌢' },
    burst: { name: '💥 Burst', icon: '⟳' },
    flower2: { name: '🌺 Flower2', icon: '❀' },
    shape: { name: '🔷 Shape', icon: '◆' },
    tunnel: { name: '🌌 Tunnel', icon: '◯' }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderStyleCards();
    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('spacingSlider').addEventListener('input', (e) => {
        document.getElementById('spacingValue').textContent = e.target.value;
    });
    document.getElementById('radiusSlider').addEventListener('input', (e) => {
        document.getElementById('radiusValue').textContent = e.target.value;
    });
    document.getElementById('blurSlider').addEventListener('input', (e) => {
        document.getElementById('blurValue').textContent = e.target.value;
    });
    document.getElementById('opacitySlider').addEventListener('input', (e) => {
        document.getElementById('opacityValue').textContent = e.target.value;
    });
}

function renderStyleCards() {
    const grid = document.getElementById('stylesGrid');
    grid.innerHTML = '';
    
    Object.keys(mergeStyles).forEach(styleKey => {
        const style = mergeStyles[styleKey];
        const card = document.createElement('div');
        card.className = `style-card ${styleKey === selectedStyle ? 'active' : ''}`;
        card.innerHTML = `
            <div class="style-icon">${style.icon}</div>
            <div class="style-name">${style.name}</div>
        `;
        card.onclick = () => selectStyle(styleKey, card);
        grid.appendChild(card);
    });
}

function selectStyle(styleKey, cardElement) {
    selectedStyle = styleKey;
    document.querySelectorAll('.style-card').forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');
}

function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length < 2) {
        alert('Iltimos, kamida 2 ta rasm yuklang!');
        return;
    }

    if (validFiles.length > 100) {
        alert('Maksimum 100 ta rasm yuklash mumkin!');
        return;
    }

    selectedImages = [];
    validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                selectedImages.push(img);
                if (selectedImages.length === validFiles.length) {
                    showPreview();
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function showPreview() {
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
    document.getElementById('stylesSection').style.display = 'block';
    document.getElementById('settingsSection').style.display = 'block';
    
    renderImageGallery();
    document.getElementById('imageCount').textContent = selectedImages.length;
}

function renderImageGallery() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    
    selectedImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="Image ${index + 1}">
            <button class="remove-btn" onclick="removeImage(${index})">✕</button>
        `;
        gallery.appendChild(item);
    });
}

function removeImage(index) {
    selectedImages.splice(index, 1);
    if (selectedImages.length < 2) {
        alert('Kamida 2 ta rasm kerak!');
        resetApp();
    } else {
        renderImageGallery();
    }
}

function resetApp() {
    selectedImages = [];
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadSection').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('stylesSection').style.display = 'none';
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'none';
}

async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: 'user',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });

        streamActive = stream;
        const video = document.getElementById('cameraVideo');
        video.srcObject = stream;
        document.getElementById('cameraModal').classList.add('active');
    } catch (error) {
        alert('Kameraga kirish ruxsati kerak!');
    }
}

function closeCamera() {
    if (streamActive) {
        streamActive.getTracks().forEach(track => track.stop());
        streamActive = null;
    }
    document.getElementById('cameraModal').classList.remove('active');
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => {
        selectedImages.push(img);
        closeCamera();
        
        if (selectedImages.length >= 2) {
            showPreview();
        } else {
            alert(`${selectedImages.length} ta rasm yuklandi. Kamida 2 ta kerak.`);
        }
    };
}

async function mergeImages() {
    if (selectedImages.length < 2) {
        alert('Kamida 2 ta rasm kerak!');
        return;
    }

    showSpinner(true);

    const qualities = {
        '2K': { width: 2560, height: 1440 },
        '4K': { width: 3840, height: 2160 },
        '6K': { width: 5760, height: 3240 },
        '8K': { width: 7680, height: 4320 }
    };

    const quality = document.getElementById('qualitySelect').value;
    const { width, height } = qualities[quality];
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = document.getElementById('bgColorPicker').value;
    ctx.fillRect(0, 0, width, height);

    // Merge images based on selected style
    const spacing = parseInt(document.getElementById('spacingSlider').value);
    const radius = parseInt(document.getElementById('radiusSlider').value);
    const blur = parseInt(document.getElementById('blurSlider').value);
    const opacity = parseInt(document.getElementById('opacitySlider').value) / 100;

    ctx.globalAlpha = opacity;
    if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
    }

    mergeStylesEngine[selectedStyle](ctx, selectedImages, width, height, spacing, radius);

    // Display result
    const resultCanvas = document.getElementById('resultCanvas');
    resultCanvas.width = width;
    resultCanvas.height = height;
    const resultCtx = resultCanvas.getContext('2d');
    resultCtx.drawImage(canvas, 0, 0);

    document.getElementById('resultSection').style.display = 'block';
    window.scrollTo(0, document.getElementById('resultSection').offsetTop - 100);
    showSpinner(false);
}

const mergeStylesEngine = {
    grid: (ctx, images, w, h, sp, r) => {
        const cols = Math.ceil(Math.sqrt(images.length));
        const rows = Math.ceil(images.length / cols);
        const itemW = (w - sp * (cols + 1)) / cols;
        const itemH = (h - sp * (rows + 1)) / rows;

        images.forEach((img, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = sp + col * (itemW + sp);
            const y = sp + row * (itemH + sp);
            drawRoundedImage(ctx, img, x, y, itemW, itemH, r);
        });
    },

    horizontal: (ctx, images, w, h, sp, r) => {
        const itemW = (w - sp * (images.length + 1)) / images.length;
        const itemH = h - sp * 2;
        images.forEach((img, i) => {
            const x = sp + i * (itemW + sp);
            const y = sp;
            drawRoundedImage(ctx, img, x, y, itemW, itemH, r);
        });
    },

    vertical: (ctx, images, w, h, sp, r) => {
        const itemW = w - sp * 2;
        const itemH = (h - sp * (images.length + 1)) / images.length;
        images.forEach((img, i) => {
            const x = sp;
            const y = sp + i * (itemH + sp);
            drawRoundedImage(ctx, img, x, y, itemW, itemH, r);
        });
    },

    circle: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(w, h) / 2 - sp * 2;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    spiral: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.5);

        images.forEach((img, i) => {
            const angle = i * 0.5;
            const radius = (i / images.length) * Math.min(w, h) / 2.5;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    diamond: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / Math.sqrt(images.length * 2);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2 + Math.PI / 4;
            const radius = Math.min(w, h) / 3;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    hexagon: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.4);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const radius = Math.min(w, h) / 2.5;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    star: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(w, h) / 3;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    heart: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.6);

        images.forEach((img, i) => {
            const t = (i / images.length) * Math.PI * 2;
            const x = centerX + (16 * Math.pow(Math.sin(t), 3) * 15) - size / 2;
            const y = centerY - (13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)) * 1.5 - size / 2;
            drawRoundedImage(ctx, img, Math.max(0, x), Math.max(0, y), size, size, r);
        });
    },

    flower: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const petals = Math.ceil(images.length / 2);
        const size = Math.min(w, h) / (petals + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const radius = Math.min(w, h) / 3;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    butterfly: (ctx, images, w, h, sp, r) => {
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.7);

        images.forEach((img, i) => {
            const xOffset = (i - images.length / 2) * size * 1.5;
            const yOffset = Math.sin(i * Math.PI / images.length) * h / 4;
            drawRoundedImage(ctx, img, w / 2 + xOffset - size / 2, centerY + yOffset - size / 2, size, size, r);
        });
    },

    mosaic: (ctx, images, w, h, sp, r) => {
        mergeStylesEngine.grid(ctx, images, w, h, sp * 2, r);
    },

    collage: (ctx, images, w, h, sp, r) => {
        const cols = Math.max(2, Math.floor(Math.sqrt(images.length * 1.3)));
        const rows = Math.ceil(images.length / cols);
        const itemW = (w - sp * (cols + 1)) / cols;
        const itemH = (h - sp * (rows + 1)) / rows;

        images.forEach((img, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = sp + col * (itemW + sp) + (Math.random() - 0.5) * sp;
            const y = sp + row * (itemH + sp) + (Math.random() - 0.5) * sp;
            ctx.save();
            ctx.rotate((Math.random() - 0.5) * 0.1);
            drawRoundedImage(ctx, img, x, y, itemW * 0.95, itemH * 0.95, r);
            ctx.restore();
        });
    },

    puzzle: (ctx, images, w, h, sp, r) => {
        const cols = Math.ceil(Math.sqrt(images.length));
        const rows = Math.ceil(images.length / cols);
        const itemW = w / cols;
        const itemH = h / rows;

        images.forEach((img, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            drawRoundedImage(ctx, img, col * itemW + sp, row * itemH + sp, itemW - sp * 2, itemH - sp * 2, r);
        });
    },

    cascade: (ctx, images, w, h, sp, r) => {
        const size = Math.min(w, h) / 2;
        images.forEach((img, i) => {
            const x = sp + (i * (w - sp * 2)) / images.length;
            const y = sp + (i * (h - sp * 2)) / images.length;
            drawRoundedImage(ctx, img, x, y, size * 0.7, size * 0.7, r);
        });
    },

    fan: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.5);

        images.forEach((img, i) => {
            const angle = (i - images.length / 2) * (Math.PI / (images.length + 1));
            const radius = Math.min(w, h) / 3;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    layers: (ctx, images, w, h, sp, r) => {
        const size = Math.min(w, h) * 0.8;
        images.forEach((img, i) => {
            ctx.globalAlpha = 1 - (i * 0.1);
            const offset = i * sp * 2;
            drawRoundedImage(ctx, img, w / 2 - size / 2 + offset, h / 2 - size / 2 + offset, size - offset * 2, size - offset * 2, r);
        });
        ctx.globalAlpha = 1;
    },

    sine: (ctx, images, w, h, sp, r) => {
        const itemW = (w - sp * (images.length + 1)) / images.length;
        images.forEach((img, i) => {
            const x = sp + i * (itemW + sp);
            const y = h / 2 + Math.sin(i * Math.PI / images.length) * (h / 3);
            drawRoundedImage(ctx, img, x, y - itemW / 2, itemW, itemW, r);
        });
    },

    twist: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 4;
            const radius = (i / images.length) * Math.min(w, h) / 2.5;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    dna: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const size = Math.min(w, h) / (images.length * 0.6);

        images.forEach((img, i) => {
            const y = sp + (i / images.length) * (h - sp * 2);
            const x = centerX + Math.sin(i * Math.PI / 5) * w / 4;
            drawRoundedImage(ctx, img, x - size / 2, y, size, size, r);
        });
    },

    gallery: (ctx, images, w, h, sp, r) => {
        mergeStylesEngine.horizontal(ctx, images, w, h, sp * 2, r);
    },

    frame: (ctx, images, w, h, sp, r) => {
        if (images.length === 0) return;
        const mainSize = Math.min(w, h) * 0.6;
        drawRoundedImage(ctx, images[0], w / 2 - mainSize / 2, h / 2 - mainSize / 2, mainSize, mainSize, r);

        const restImages = images.slice(1);
        const restSize = mainSize / (restImages.length + 2);
        restImages.forEach((img, i) => {
            const angle = (i / restImages.length) * Math.PI * 2;
            const radius = mainSize / 2 + restSize;
            const x = w / 2 + Math.cos(angle) * radius - restSize / 2;
            const y = h / 2 + Math.sin(angle) * radius - restSize / 2;
            drawRoundedImage(ctx, img, x, y, restSize, restSize, r);
        });
    },

    corners: (ctx, images, w, h, sp, r) => {
        const size = Math.min(w, h) / 3;
        const positions = [
            [sp, sp],
            [w - size - sp, sp],
            [sp, h - size - sp],
            [w - size - sp, h - size - sp]
        ];

        images.slice(0, 4).forEach((img, i) => {
            if (positions[i]) {
                drawRoundedImage(ctx, img, positions[i][0], positions[i][1], size, size, r);
            }
        });

        if (images.length > 4) {
            mergeStylesEngine.grid(ctx, images.slice(4), w / 2, h / 2, sp, r);
        }
    },

    concentric: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const maxRadius = Math.min(w, h) / 2 - sp;
        const size = (2 * maxRadius) / (images.length + 1);

        images.forEach((img, i) => {
            const radius = maxRadius - (i * size);
            drawRoundedImage(ctx, img, centerX - size / 2, centerY - size / 2, size, size, r);
        });
    },

    checkerboard: (ctx, images, w, h, sp, r) => {
        const cols = Math.ceil(Math.sqrt(images.length * 1.5));
        const rows = Math.ceil(images.length / cols);
        const itemW = w / cols;
        const itemH = h / rows;

        images.forEach((img, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            if ((col + row) % 2 === 0) {
                drawRoundedImage(ctx, img, col * itemW + sp, row * itemH + sp, itemW - sp * 2, itemH - sp * 2, r);
            }
        });
    },

    infinity: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const t = (i / images.length) * Math.PI * 2;
            const x = centerX + Math.cos(t) * (w / 4) - size / 2;
            const y = centerY + Math.sin(t * 2) * (h / 6) - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    mandala: (ctx, images, w, h, sp, r) => {
        mergeStylesEngine.circle(ctx, images, w, h, sp, r);
    },

    peacock: (ctx, images, w, h, sp, r) => {
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.8);

        images.forEach((img, i) => {
            const angle = (i - images.length / 2) * (Math.PI / (images.length + 1));
            const x = w / 2 + Math.cos(angle) * (w / 3) - size / 2;
            const y = centerY + Math.sin(angle) * (h / 3) - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    overlap: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / 2.5;

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const offsetX = Math.cos(angle) * (size / 3);
            const offsetY = Math.sin(angle) * (size / 3);
            drawRoundedImage(ctx, img, centerX + offsetX - size / 2, centerY + offsetY - size / 2, size, size, r);
        });
    },

    random: (ctx, images, w, h, sp, r) => {
        images.forEach((img) => {
            const size = Math.random() * (Math.min(w, h) / 3) + Math.min(w, h) / 6;
            const x = Math.random() * (w - size);
            const y = Math.random() * (h - size);
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    artistic: (ctx, images, w, h, sp, r) => {
        const cols = Math.ceil(Math.sqrt(images.length * 0.8));
        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const size = Math.min(w, h) / (cols + 1);
            const x = w / 2 + Math.cos(angle) * (w / 2.5) - size / 2;
            const y = h / 2 + Math.sin(angle) * (h / 2.5) - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    mirror: (ctx, images, w, h, sp, r) => {
        const half = Math.ceil(images.length / 2);
        images.slice(0, half).forEach((img, i) => {
            const itemH = (h - sp * (half + 1)) / half;
            drawRoundedImage(ctx, img, sp, sp + i * (itemH + sp), w / 2 - sp * 1.5, itemH, r);
            if (images[half + i]) {
                drawRoundedImage(ctx, images[half + i], w / 2 + sp * 0.5, sp + i * (itemH + sp), w / 2 - sp * 1.5, itemH, r);
            }
        });
    },

    wave: (ctx, images, w, h, sp, r) => {
        images.forEach((img, i) => {
            const x = sp + (i / images.length) * (w - sp * 2);
            const y = h / 2 + Math.cos(i * Math.PI / 3) * (h / 4);
            const size = Math.min(w, h) / (images.length * 0.8);
            drawRoundedImage(ctx, img, x - size / 2, y - size / 2, size, size, r);
        });
    },

    stack: (ctx, images, w, h, sp, r) => {
        const itemW = w - sp * 2;
        const itemH = (h - sp * (images.length + 1)) / images.length;
        images.forEach((img, i) => {
            drawRoundedImage(ctx, img, sp, sp + i * (itemH + sp), itemW, itemH, r);
        });
    },

    radial: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const maxSize = Math.min(w, h) / 2.5;

        images.forEach((img, i) => {
            const size = maxSize * (1 - i / images.length);
            drawRoundedImage(ctx, img, centerX - size / 2, centerY - size / 2, size, size, r);
        });
    },

    cross: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.5);

        images.forEach((img, i) => {
            const isVertical = i % 2 === 0;
            const offset = (i - Math.floor(images.length / 2)) * size * 1.2;
            const x = isVertical ? centerX - size / 2 : centerX + offset - size / 2;
            const y = isVertical ? centerY + offset - size / 2 : centerY - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    diagonal: (ctx, images, w, h, sp, r) => {
        const size = (Math.min(w, h) - sp * 2) / Math.sqrt(images.length * 2);
        images.forEach((img, i) => {
            const x = sp + (i * (w - sp * 2)) / images.length;
            const y = sp + (i * (h - sp * 2)) / images.length;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    zigzag: (ctx, images, w, h, sp, r) => {
        const itemW = (w - sp * (images.length + 1)) / images.length;
        images.forEach((img, i) => {
            const x = sp + i * (itemW + sp);
            const yOffset = (i % 2) ? -h / 6 : h / 6;
            drawRoundedImage(ctx, img, x, h / 2 + yOffset - itemW / 2, itemW, itemW, r);
        });
    },

    sunburst: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const radius = (i + 1) * (Math.min(w, h) / (images.length * 2.5));
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    tree: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        let yPos = sp;
        const size = Math.min(w, h) / 4;

        images.forEach((img, i) => {
            const levelSize = size / (Math.floor(i / 3) + 1);
            const xOffset = ((i % 3) - 1) * levelSize * 1.2;
            drawRoundedImage(ctx, img, centerX + xOffset - levelSize / 2, yPos, levelSize, levelSize, r);
            if ((i + 1) % 3 === 0) yPos += levelSize + sp;
        });
    },

    cloud: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const baseSize = Math.min(w, h) / (images.length + 2);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const radius = Math.min(w, h) / 3;
            const size = baseSize * (0.7 + Math.random() * 0.3);
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    wave2: (ctx, images, w, h, sp, r) => {
        images.forEach((img, i) => {
            const x = sp + (i / images.length) * (w - sp * 2);
            const y = h / 2 + Math.sin(i * Math.PI / 2) * (h / 3);
            const size = Math.min(w, h) / (images.length * 0.9);
            drawRoundedImage(ctx, img, x - size / 2, y - size / 2, size, size, r);
        });
    },

    matrix: (ctx, images, w, h, sp, r) => {
        const cols = 3;
        const rows = Math.ceil(images.length / cols);
        const itemW = (w - sp * (cols + 1)) / cols;
        const itemH = (h - sp * (rows + 1)) / rows;

        images.forEach((img, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            drawRoundedImage(ctx, img, sp + col * (itemW + sp), sp + row * (itemH + sp), itemW, itemH, r);
        });
    },

    honeycomb: (ctx, images, w, h, sp, r) => {
        mergeStylesEngine.hexagon(ctx, images, w, h, sp, r);
    },

    rainbow: (ctx, images, w, h, sp, r) => {
        const itemW = (w - sp * (images.length + 1)) / images.length;
        images.forEach((img, i) => {
            const x = sp + i * (itemW + sp);
            const angle = (i / images.length) * Math.PI;
            const yOffset = Math.sin(angle) * (h / 3);
            drawRoundedImage(ctx, img, x, h / 2 + yOffset - itemW / 2, itemW, itemW, r);
        });
    },

    burst: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const size = Math.min(w, h) / (images.length * 0.4);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * (w / 3) - size / 2;
            const y = centerY + Math.sin(angle) * (h / 3) - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    flower2: (ctx, images, w, h, sp, r) => {
        mergeStylesEngine.flower(ctx, images, w, h, sp, r);
    },

    shape: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(w, h) / 2.5;
        const size = Math.min(w, h) / (images.length + 1);

        images.forEach((img, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            drawRoundedImage(ctx, img, x, y, size, size, r);
        });
    },

    tunnel: (ctx, images, w, h, sp, r) => {
        const centerX = w / 2;
        const centerY = h / 2;

        images.forEach((img, i) => {
            const size = ((i + 1) / images.length) * Math.min(w, h);
            const opacity = 1 - (i / images.length);
            ctx.globalAlpha = opacity;
            drawRoundedImage(ctx, img, centerX - size / 2, centerY - size / 2, size, size, r);
        });
        ctx.globalAlpha = 1;
    }
};

function drawRoundedImage(ctx, img, x, y, w, h, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
}

function showSpinner(show) {
    document.getElementById('spinner').classList.toggle('active', show);
}

function downloadImage(format) {
    const canvas = document.getElementById('resultCanvas');
    const link = document.createElement('a');
    
    if (format === 'png') {
        link.href = canvas.toDataURL('image/png');
        link.download = `merged-image-${Date.now()}.png`;
    } else if (format === 'jpg') {
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.download = `merged-image-${Date.now()}.jpg`;
    } else if (format === 'webp') {
        link.href = canvas.toDataURL('image/webp', 0.95);
        link.download = `merged-image-${Date.now()}.webp`;
    }
    
    link.click();
}