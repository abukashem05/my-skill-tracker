let physicsEnabled = false;
let engine, render, runner, composite;

function togglePhysics(renderSkillsCallback) {
    physicsEnabled = !physicsEnabled;
    const btn = document.getElementById('grav-btn');
    const body = document.getElementById('app-body');

    if (physicsEnabled) {
        btn.innerHTML = '<i class="fas fa-undo mr-2"></i> RESET GRAVITY';
        btn.classList.replace('bg-black', 'bg-red-600');
        body.classList.add('physics-active');

        const cards = document.querySelectorAll('.skill-card');
        cards.forEach(c => c.classList.add('physics-mode'));

        // Initialize Engine
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        engine = Engine.create();
        engine.gravity.y = 1;

        const wallOpts = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOpts);
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOpts);
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOpts);

        Composite.add(engine.world, [ground, leftWall, rightWall]);

        const bodies = [];
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const body = Bodies.rectangle(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                rect.width,
                rect.height,
                {
                    restitution: 0.5,
                    frictionAir: 0.02,
                    angle: (Math.random() - 0.5) * 0.5
                }
            );
            body.domElement = card;
            bodies.push(body);
        });

        Composite.add(engine.world, bodies);

        const mouse = Mouse.create(document.body);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });
        Composite.add(engine.world, mouseConstraint);

        runner = Runner.create();
        Runner.run(runner, engine);

        function updateLoop() {
            if (!physicsEnabled) return;
            bodies.forEach(b => {
                if (b.domElement) {
                    const x = b.position.x - b.domElement.offsetWidth / 2;
                    const y = b.position.y - b.domElement.offsetHeight / 2;
                    b.domElement.style.transform = `translate(${x}px, ${y}px) rotate(${b.angle}rad)`;
                    b.domElement.style.top = '0';
                    b.domElement.style.left = '0';
                }
            });
            requestAnimationFrame(updateLoop);
        }
        updateLoop();

    } else {
        btn.innerHTML = '<i class="fas fa-meteor mr-2"></i> ACTIVATE ANTIGRAVITY';
        btn.classList.replace('bg-red-600', 'bg-black');
        body.classList.remove('physics-active');

        if (runner) Runner.stop(runner);
        if (engine) Matter.Engine.clear(engine);
        engine = null;
        runner = null;

        // Force clear and re-render
        console.log("Resetting gravity: Stopping engine...");

        // Aggressive cleanup: Remove ALL skill cards from DOM, wherever they are
        document.querySelectorAll('.skill-card').forEach(c => c.remove());

        const grid = document.getElementById('skills-grid');
        if (grid) grid.innerHTML = ''; // Double check

        console.log("Resetting gravity: cleared grid. Re-rendering...");

        setTimeout(() => {
            if (renderSkillsCallback) renderSkillsCallback();
            console.log("Resetting gravity: Render complete.");
        }, 50);
    }
}
