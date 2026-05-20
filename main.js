const years = ['1cp', '2cp'];

function buildSection(data) {
    const section = document.createElement('section');
    section.className = 'yearBox';
    section.id = data.id;

    section.innerHTML = `
        <h1><a href="${data.url}">${data.id.toUpperCase()}</a></h1>
        <div class="semesterContainer">
            <div class="semesterBox">
                <h1><a href="${data.s1.url}">Semester 1</a></h1>
                <div class="modules">
                    <ul>
                        ${data.s1.modules.map(mod => `
                            <li><a href="${mod.url}" target="_blank">${mod.name}</a></li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <div class="semesterBox">
                <h1><a href="${data.s2.url}">Semester 2</a></h1>
                <div class="modules">
                    <ul>
                        ${data.s2.modules.map(mod => `
                            <li><a href="${mod.url}" target="_blank">${mod.name}</a></li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    return section;
}

async function loadAll() {
    const content = document.getElementById('content');
    content.innerHTML = `<p style="color:rgba(255,255,255,0.8); text-align:center; padding:40px;">Loading modules...</p>`;

    for (const year of years) {
        try {
            // Load from JSON file in data folder
            const response = await fetch(`./data/${year}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${year}.json not found`);
            }
            
            const data = await response.json();
            content.appendChild(buildSection(data));
            console.log(`✓ Loaded ${year}.json`);
            
        } catch (error) {
            console.error(`✗ Failed to load ${year}.json:`, error.message);
            
            // Display error message in the content area
            const errorSection = document.createElement('div');
            errorSection.style.cssText = `
                background: rgba(255, 100, 100, 0.1);
                border: 1px solid rgba(255, 100, 100, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin: 20px auto;
                max-width: 900px;
                text-align: center;
                color: #ff9999;
                font-family: monospace;
            `;
            errorSection.innerHTML = `
                <strong>⚠️ Error loading ${year}.json</strong><br>
                <small>${error.message}</small><br>
                <small style="color: #ffcc99;">Make sure the file exists at: ./data/${year}.json</small>
            `;
            content.appendChild(errorSection);
        }
    }

    // Remove loading message
    const loadingMessage = content.querySelector('p');
    if (loadingMessage && loadingMessage.innerText.includes('Loading')) {
        loadingMessage.remove();
    }
}

// Start loading when page loads
loadAll();