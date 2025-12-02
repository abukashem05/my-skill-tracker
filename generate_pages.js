const fs = require('fs');
const path = require('path');

// Read data.js
const dataPath = path.join(__dirname, 'js', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract skillsData array using a simple evaluation (safe enough for this context)
// We wrap it in a function to avoid polluting global scope if we were using require
// But here we just want the array.
// Extract skillsData array using regex since eval in local scope is tricky with const
// We look for: const skillsData = [...];
let skillsData; // Declare skillsData here to match the original scope
const match = dataContent.match(/const\s+skillsData\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find skillsData array in data.js");
    process.exit(1);
}

// Evaluate the array string to get the actual object
// We can use eval here because we extracted just the array part
try {
    skillsData = eval(match[1]);
} catch (e) {
    console.error("Error parsing extracted data:", e);
    process.exit(1);
}

// Read skill.html template
const templatePath = path.join(__dirname, 'skill.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Fix paths for subdirectory (css/ -> ../css/, js/ -> ../js/)
template = template.replace(/href="css\//g, 'href="../css/');
template = template.replace(/src="js\//g, 'src="../js/');
template = template.replace(/href="home.html"/g, 'href="../home.html"');

// Ensure output directory exists
const outputDir = path.join(__dirname, 'skills');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Generate pages
skillsData.forEach(skill => {
    let pageContent = template;

    // Inject the ID as a global variable so skill.js can pick it up
    const scriptInjection = `<script>window.currentSkillId = ${skill.id};</script>\n    <script src="../js/data.js"></script>`;
    pageContent = pageContent.replace('<script src="../js/data.js"></script>', scriptInjection);

    // Write file
    const fileName = `${skill.id}.html`;
    fs.writeFileSync(path.join(outputDir, fileName), pageContent);
    console.log(`Generated skills/${fileName}`);
});

console.log("Done generating static pages.");
