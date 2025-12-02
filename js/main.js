// State Management
const savedState = JSON.parse(localStorage.getItem('skillState')) || {};
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Init Dark Mode
if (isDarkMode) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);

    // Update button icon if exists
    const btn = document.getElementById('theme-btn');
    if (btn) {
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Expose togglePhysics to window for the button onclick
// Assumes togglePhysics is already loaded globally
window.togglePhysics = () => togglePhysics(renderSkills);

function saveSkill(id, isDone) {
    savedState[id] = isDone;
    localStorage.setItem('skillTrackerState', JSON.stringify(savedState));
    updateStats();
    initChart();

    if (isDone) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
// Expose saveSkill to window
window.saveSkill = saveSkill;

function getCategoryColor(cat) {
    const colors = {
        'Basic Competency': 'bg-slate-100 text-slate-600',
        'Frontend': 'bg-blue-50 text-blue-600',
        'Backend': 'bg-emerald-50 text-emerald-600',
        'Full Stack': 'bg-purple-50 text-purple-600',
        'Soft Skills': 'bg-amber-50 text-amber-600'
    };
    return colors[cat] || 'bg-slate-100 text-slate-600';
}

function renderSkills(filter = 'all') {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = '';

    skillsData.forEach(skill => {
        if (filter !== 'all' && !skill.cat.includes(filter)) return;

        const isDone = savedState[skill.id] ? 'checked' : '';
        const card = document.createElement('div');

        // Navigation Logic: Go to skill.html with ID
        card.className = `skill-card relative p-4 rounded-xl border bg-white shadow-sm hover:shadow-md flex flex-col justify-between h-32 select-none cursor-grab active:cursor-grabbing`;
        card.setAttribute('data-id', skill.id);
        card.onclick = (e) => {
            if (physicsEnabled) return;
            // Prevent navigation if clicking the checkbox
            if (e.target.closest('.checkbox-wrapper')) return;
            window.location.href = `skills/${skill.id}.html`;
        };

        const colorClass = getCategoryColor(skill.cat);

        card.innerHTML = `
            <div class="flex justify-between items-start pointer-events-none">
                <div class="text-xs font-bold px-2 py-1 rounded-md mb-2 ${colorClass}">
                    W${skill.week} • ${skill.cat.split(' ')[0]}
                </div>
                <i class="fas ${skill.icon} text-gray-300"></i>
            </div>
            <h3 class="font-bold text-gray-800 dark:text-white leading-tight pr-8 pointer-events-none">${skill.name}</h3>
            
            <label class="checkbox-wrapper absolute bottom-4 right-4 cursor-pointer z-20" onclick="event.stopPropagation()">
                <input type="checkbox" class="hidden" onchange="saveSkill(${skill.id}, this.checked)" ${isDone}>
                <div class="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 text-white hidden pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </label>
        `;
        grid.appendChild(card);
    });
}
// Expose renderSkills to window for filter buttons
window.filterSkills = renderSkills;

function updateStats() {
    const total = skillsData.length;
    const completed = Object.values(savedState).filter(v => v).length;
    const percent = Math.round((completed / total) * 100);

    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');

    if (progressText) progressText.innerText = `${percent}% `;
    if (progressBar) progressBar.style.width = `${percent}% `;

    initCalendar();
}

function initCalendar() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    // Update Month Header
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('calendar-month').innerText = `${monthNames[currentMonth]} ${currentYear} `;

    // Generate Grid
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    // Days of week headers
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    days.forEach(d => {
        const el = document.createElement('div');
        el.innerText = d;
        el.className = 'font-bold text-gray-500';
        grid.appendChild(el);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const el = document.createElement('div');
        el.innerText = i;
        el.className = 'p-1 rounded-full cursor-default';

        if (i === currentDate) {
            el.classList.add('bg-purple-600', 'text-white', 'font-bold');
        } else {
            el.classList.add('hover:bg-gray-100');
        }
        grid.appendChild(el);
    }

    // Calculate Week Number (Assuming Jan 1st start)
    const startOfYear = new Date(currentYear, 0, 1);
    const pastDays = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);

    // Cap week at 52
    const currentWeek = weekNum > 52 ? 52 : weekNum;

    const weekDisplay = document.getElementById('current-week-display');
    const skillDisplay = document.getElementById('current-skill-display');

    if (weekDisplay) weekDisplay.innerText = `Week ${currentWeek} `;

    const weekSkill = skillsData.find(s => s.week === currentWeek);
    if (weekSkill && skillDisplay) {
        skillDisplay.innerText = weekSkill.name;
        skillDisplay.title = weekSkill.name; // Tooltip for truncation
    } else if (skillDisplay) {
        skillDisplay.innerText = "Review / Break";
    }
}

let myChart;
function initChart() {
    const ctx = document.getElementById('miniChart');
    if (!ctx) return;

    // Calculate Done vs Not Done
    const completed = Object.values(savedState).filter(v => v).length;
    const remaining = skillsData.length - completed;

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Done', 'Left'],
            datasets: [{
                data: [completed, remaining],
                backgroundColor: ['#2563EB', '#E5E7EB'], // Blue vs Gray
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '75%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            responsive: true,
            maintainAspectRatio: false,
            animation: { animateScale: true }
        }
    });
}

// AI Logic
window.toggleAIReview = function () {
    const modal = document.getElementById('ai-modal');
    const content = document.getElementById('ai-modal-content');
    const loading = document.getElementById('ai-loading');
    const result = document.getElementById('ai-result');

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
        }, 10);
        loading.classList.remove('hidden');
        result.classList.add('hidden');
        setTimeout(generateAIResponse, 2000);
    } else {
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

function generateAIResponse() {
    const completedCount = Object.values(savedState).filter(v => v).length;
    const percent = Math.round((completedCount / 52) * 100);
    const statusEl = document.getElementById('ai-status-text');
    const actionEl = document.getElementById('ai-action-text');

    let statusMsg = "";
    let actionMsg = "";

    if (percent < 10) {
        statusMsg = `You are at the start of your journey(${percent} %).The foundation is key.Don't rush the Basic Competency module.`;
        actionMsg = "Recommendation: Complete 'Smart Google Search' and 'Zotero' this week. These two tools will save you 100+ hours later.";
    } else if (percent < 40) {
        statusMsg = `Solid progress (${percent}%). You are entering the heavy data phase. Consistency usually drops here—stay sharp.`;
        actionMsg = "Recommendation: Ensure your 'Data Cleaning Basics' are strong before moving to SPSS. Bad data = Bad research.";
    } else {
        statusMsg = `Excellent momentum (${percent}%). You are mastering the toolkit. Now it's about application.`;
        actionMsg = "Recommendation: Start drafting your first real abstract using the 'IMRaD' structure you learned.";
    }

    statusEl.innerText = statusMsg;
    actionEl.innerText = actionMsg;

    document.getElementById('ai-loading').classList.add('hidden');
    document.getElementById('ai-result').classList.remove('hidden');
}

// Data Backup Logic
window.exportData = function () {
    const data = {
        savedState: JSON.parse(localStorage.getItem('skillState')) || {},
        notes: {},
        resources: {}
    };

    // Collect all notes and resources
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('notes_')) {
            data.notes[key] = localStorage.getItem(key);
        } else if (key.startsWith('resources_')) {
            data.resources[key] = localStorage.getItem(key);
        }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zerogravity_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

window.triggerImport = function () {
    document.getElementById('import-file').click();
}

window.importData = function (input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Restore State
            if (data.savedState) {
                localStorage.setItem('skillState', JSON.stringify(data.savedState));
            }

            // Restore Notes
            if (data.notes) {
                Object.keys(data.notes).forEach(key => {
                    localStorage.setItem(key, data.notes[key]);
                });
            }

            // Restore Resources
            if (data.resources) {
                Object.keys(data.resources).forEach(key => {
                    localStorage.setItem(key, data.resources[key]);
                });
            }

            alert('Data imported successfully! Reloading...');
            location.reload();
        } catch (err) {
            alert('Error importing data: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// Init
window.onload = function () {
    renderSkills();
    updateStats();
    initChart();
};
