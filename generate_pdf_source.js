const fs = require('fs');
const path = require('path');

// Configuration
const targetDir = '.'; // Scans the entire root directory
const outputFile = 'combined_codebase.md';

// Folders you want to completely ignore
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'venv', '__pycache__']; 

// File types you want to include in the PDF. 
// Add your specific backend extensions here if they are different (e.g., '.py', '.go', '.java')
const allowedExtensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.html']; 

let outputContent = '# Project Source Code\n\n';

function walkDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    // Format path for display (convert Windows backslashes and remove leading './')
    let displayPath = currentPath.replace(/\\/g, '/');
    if (displayPath.startsWith('./')) {
        displayPath = displayPath.substring(2);
    }

    // Explicitly list empty folders
    if (items.length === 0) {
        // We only want to list it if it's not the root itself
        if (displayPath !== '.') {
            outputContent += `## ${displayPath}/\n\n*(Empty Directory)*\n\n`;
        }
        return;
    }

    for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Traverse if it's not in the ignore list and not a hidden folder (like .vscode)
            if (!ignoreDirs.includes(item) && !item.startsWith('.')) {
                walkDirectory(fullPath);
            }
        } else {
            const ext = path.extname(item);
            
            // Skip the script itself and the output file to prevent duplication
            if (item === 'generate-pdf-source.js' || item === outputFile) continue;

            if (allowedExtensions.includes(ext)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    let cleanFilePath = fullPath.replace(/\\/g, '/');
                    if (cleanFilePath.startsWith('./')) {
                        cleanFilePath = cleanFilePath.substring(2);
                    }
                    
                    outputContent += `## ${cleanFilePath}\n\n`;
                    outputContent += `\`\`\`${ext.substring(1) || 'text'}\n`;
                    outputContent += `${content}\n`;
                    outputContent += `\`\`\`\n\n`;
                } catch (err) {
                    console.error(`Could not read file ${fullPath}:`, err);
                }
            }
        }
    }
}

walkDirectory(targetDir);

fs.writeFileSync(outputFile, outputContent);
console.log(`✅ Success! All code and empty folders have been mapped to ${outputFile}`);