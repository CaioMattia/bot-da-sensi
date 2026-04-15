const lowSensToggle = document.getElementById('lowSens');
const generateBtn = document.getElementById('generateBtn');
const resultDiv = document.getElementById('result');
const sensiOutput = document.getElementById('sensiOutput');
const copyBtn = document.getElementById('copyBtn');

// Based on real pro players
const pros = [
    { name: "Nobru", dpi: 700, geral: 148, redDot: 153, mira2x: 160, mira4x: 153, botao: 50 },
    { name: "Thurzin", dpi: 620, geral: 156, redDot: 144, mira2x: 167, mira4x: 155, botao: 39 },
    { name: "Two9", dpi: 950, geral: 197, redDot: 100, mira2x: 185, mira4x: 170, botao: 45 },
    { name: "Bak (Emu)", dpi: 800, geral: 130, redDot: 100, mira2x: 160, mira4x: 165, botao: 55 },
    { name: "Ghost", dpi: 800, geral: 185, redDot: 192, mira2x: 171, mira4x: 167, botao: 49 }
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

generateBtn.addEventListener('click', () => {
    const platform = document.querySelector('input[name="platform"]:checked').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const isLowSens = lowSensToggle.checked;

    // Base specific selection Logic
    let basePros = [];
    if (platform === 'emulador') {
        basePros = pros.filter(p => ["Bak (Emu)", "Two9"].includes(p.name));
    } else if (platform === 'android') {
        basePros = pros.filter(p => ["Ghost", "Nobru", "Thurzin"].includes(p.name));
    } else { // ios
        basePros = pros.filter(p => ["Nobru", "Two9", "Thurzin"].includes(p.name));
    }

    if (basePros.length === 0) basePros = pros;

    const baseData = basePros[Math.floor(Math.random() * basePros.length)];
    
    // Copy base values to modify
    let sensi = {
        geral: baseData.geral,
        redDot: baseData.redDot,
        mira2x: baseData.mira2x,
        mira4x: baseData.mira4x,
        botao: baseData.botao,
        dpi: baseData.dpi
    };

    // Low / High Sens Adaptation
    let multiplier = 1.0;
    if (isLowSens) {
        multiplier = 0.82; // Low sens decreases values
    } else {
        multiplier = 1.06; // High sens increases slightly
    }

    // Role Adaptation
    if (role === 'rushador') {
        sensi.geral = sensi.geral * 1.1;
        sensi.mira2x = sensi.mira2x * 1.05;
        sensi.botao = Math.max(30, sensi.botao - 5);
    } else if (role === 'suporte') {
        sensi.mira4x = sensi.mira4x * 1.08;
        sensi.redDot = sensi.redDot * 0.95;
    } else if (role === 'igl') {
        sensi.geral = sensi.geral * 0.95;
    }

    // Applying variance and multiplier
    sensi.geral = Math.round(sensi.geral * multiplier) + getRandomInt(-6, 6);
    sensi.redDot = Math.round(sensi.redDot * multiplier) + getRandomInt(-6, 6);
    sensi.mira2x = Math.round(sensi.mira2x * multiplier) + getRandomInt(-6, 6);
    sensi.mira4x = Math.round(sensi.mira4x * multiplier) + getRandomInt(-6, 6);
    sensi.botao = Math.round(sensi.botao) + getRandomInt(-3, 3);
    
    // DPI Adaptation
    let dpiOutput;
    if (platform === 'ios') {
        dpiOutput = "Máxima";
    } else {
        let dpiNum = Math.round(sensi.dpi * multiplier) + getRandomInt(-40, 60);
        dpiNum = Math.round(dpiNum / 10) * 10;
        dpiOutput = dpiNum;
    }

    // Adjust clamping
    for (const key of ['geral', 'redDot', 'mira2x', 'mira4x']) {
        if (sensi[key] > 200) sensi[key] = 200;
        if (sensi[key] < 0) sensi[key] = 0;
    }

    if(sensi.botao > 100) sensi.botao = 100;
    if(sensi.botao < 10) sensi.botao = 10;

    // Use innerHTML so we can style the numbers nicely, but the user copies them plainly
    const styledOutput = `Geral <span>${sensi.geral}</span>\nRed Dot <span>${sensi.redDot}</span>\nMira 2x <span>${sensi.mira2x}</span>\nMira 4x <span>${sensi.mira4x}</span>\nBotão de Tiro <span>${sensi.botao}%</span>\nDpi <span>${dpiOutput}</span>`;

    // Display result with slight delay for dynamic effect
    sensiOutput.style.opacity = '0.5';
    setTimeout(() => {
        sensiOutput.innerHTML = styledOutput;
        sensiOutput.style.opacity = '1';
        resultDiv.classList.remove('hidden');
    }, 150);
});

copyBtn.addEventListener('click', () => {
    // innerText preserves the line breaks but removes the span tags
    const textToCopy = sensiOutput.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado para a área de transferência!';
        copyBtn.style.color = '#fff';
        copyBtn.style.borderColor = 'rgba(255,255,255,0.3)';
        copyBtn.style.background = 'rgba(255,255,255,0.1)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
            copyBtn.style.background = '';
        }, 3000);
    });
});
