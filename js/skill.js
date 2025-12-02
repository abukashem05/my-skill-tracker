// Assumes skillsData is loaded globally

function getCategoryColor(cat) {
    const colors = {
        "Basic Competency": "text-blue-600 bg-blue-50",
        "Data & Survey": "text-green-600 bg-green-50",
        "Writing": "text-purple-600 bg-purple-50",
        "Quantitative": "text-red-600 bg-red-50",
        "Qualitative": "text-yellow-600 bg-yellow-50",
        "Career": "text-gray-600 bg-gray-50",
    };
    return colors[cat] || "text-gray-600 bg-gray-50";
}

window.onload = function () {
    let id;

    // Check for static ID first (injected by generator)
    if (typeof window.currentSkillId !== 'undefined') {
        id = window.currentSkillId;
    } else {
        // Fallback to URL params
        const params = new URLSearchParams(window.location.search);
        id = parseInt(params.get('id'));
    }

    if (!id) {
        window.location.href = '../index.html'; // Adjusted path for subfolder
        return;
    }

    const skill = skillsData.find(s => s.id === id);

    if (!skill) {
        document.body.innerHTML = '<div class="text-center p-10"><h1>Skill not found</h1><a href="index.html" class="text-blue-600 underline">Go Home</a></div>';
        return;
    }

    // Populate Data
    document.title = `${skill.name} - Zero Gravity Skill Tracker`;

    document.getElementById('res-icon').className = `fas ${skill.icon} ${getCategoryColor(skill.cat).split(' ')[0]}`;
    document.getElementById('res-week').innerText = `WEEK ${skill.week}`;
    document.getElementById('res-cat').innerText = skill.cat;

    // Update sidebar background color based on category
    const sidebar = document.getElementById('res-sidebar');
    // Simple mapping for background colors
    const bgColors = {
        "Basic Competency": "bg-blue-50",
        "Data & Survey": "bg-green-50",
        "Writing": "bg-purple-50",
        "Quantitative": "bg-red-50",
        "Qualitative": "bg-yellow-50",
        "Career": "bg-gray-50",
    };
    sidebar.className = `w-full md:w-1/3 p-6 flex flex-col justify-center items-center text-center border-r border-gray-100 ${bgColors[skill.cat] || 'bg-gray-50'}`;

    document.getElementById('res-title').innerText = skill.name;
    document.getElementById('res-desc').innerText = skill.desc;

    const linkEl = document.getElementById('res-link');
    linkEl.innerText = skill.resource;
    linkEl.href = skill.link;

    // --- Notes Feature ---
    const notesKey = `skill_notes_${id}`;
    const notesArea = document.getElementById('skill-notes');

    // Load saved notes
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) {
        notesArea.value = savedNotes;
    }

    window.saveNotes = function () {
        const text = notesArea.value;
        localStorage.setItem(notesKey, text);

        const btn = document.getElementById('save-notes-btn');
        const originalText = btn.innerText;
        btn.innerText = "Saved!";
        btn.classList.replace('bg-gray-900', 'bg-green-600');

        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.replace('bg-green-600', 'bg-gray-900');
        }, 2000);
    };

    // --- Custom Resources Feature ---
    const resourcesKey = `skill_resources_${id}`;

    function loadResources() {
        const list = document.getElementById('custom-resources-list');
        list.innerHTML = '';
        const resources = JSON.parse(localStorage.getItem(resourcesKey)) || [];

        resources.forEach((res, index) => {
            const item = document.createElement('div');
            item.className = "flex justify-between items-center bg-white p-2 rounded border border-gray-200 text-sm";
            item.innerHTML = `
                <div class="flex items-center gap-2 overflow-hidden">
                    <i class="fas fa-link text-gray-400 text-xs"></i>
                    <a href="${res.link}" target="_blank" class="text-blue-600 hover:underline truncate">${res.title}</a>
                </div>
                <button onclick="deleteResource(${index})" class="text-gray-400 hover:text-red-500 ml-2">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            list.appendChild(item);
        });
    }

    window.toggleResourceForm = function () {
        const form = document.getElementById('add-res-form');
        form.classList.toggle('hidden');
    };

    window.addResource = function () {
        const titleInput = document.getElementById('new-res-title');
        const linkInput = document.getElementById('new-res-link');
        const title = titleInput.value.trim();
        let link = linkInput.value.trim();

        if (!title || !link) {
            alert("Please enter both a title and a URL.");
            return;
        }

        if (!link.startsWith('http')) {
            link = 'https://' + link;
        }

        const resources = JSON.parse(localStorage.getItem(resourcesKey)) || [];
        resources.push({ title, link });
        localStorage.setItem(resourcesKey, JSON.stringify(resources));

        titleInput.value = '';
        linkInput.value = '';
        toggleResourceForm();
        loadResources();
    };

    window.deleteResource = function (index) {
        const resources = JSON.parse(localStorage.getItem(resourcesKey)) || [];
        resources.splice(index, 1);
        localStorage.setItem(resourcesKey, JSON.stringify(resources));
        loadResources();
    };

    loadResources();

    // --- Focus Timer Logic ---
    let timerInterval;
    let timeLeft = 25 * 60; // 25 minutes
    let isTimerRunning = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const display = document.getElementById('timer-display');
        if (display) {
            display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    window.toggleTimer = function () {
        const btn = document.getElementById('timer-btn');
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            btn.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
            btn.classList.replace('bg-red-500', 'bg-slate-900');
        } else {
            isTimerRunning = true;
            btn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
            btn.classList.replace('bg-slate-900', 'bg-red-500');

            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    btn.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
                    btn.classList.replace('bg-red-500', 'bg-slate-900');
                    alert("Focus session complete! Take a break.");
                    timeLeft = 25 * 60;
                    updateTimerDisplay();
                }
            }, 1000);
        }
    }

    window.resetTimer = function () {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timeLeft = 25 * 60;
        updateTimerDisplay();
        const btn = document.getElementById('timer-btn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
            if (btn.classList.contains('bg-red-500')) {
                btn.classList.replace('bg-red-500', 'bg-slate-900');
            }
        }
    }

    // Init Timer Display
    updateTimerDisplay();
};
