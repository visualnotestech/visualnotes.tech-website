const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLineByLine() {
    const csvPath = path.join(__dirname, 'HSRP Flashcards.csv');

    if (!fs.existsSync(csvPath)) {
        console.error('File not found:', csvPath);
        return;
    }

    const fileStream = fs.createReadStream(csvPath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const flashcards = [];
    let isHeader = true;

    for await (const line of rl) {
        if (isHeader) {
            isHeader = false;
            continue;
        }

        // Simplistic parser for basic CSV formats
        const matches = line.match(/(?:\"([^\"]*)\")|([^,]+)/g);

        if (matches && matches.length >= 2) {
            const q = matches[0].replace(/^"|"$/g, '').trim();
            const a = matches[1].replace(/^"|"$/g, '').trim();
            if (q && a) {
                flashcards.push({ question: q, answer: a });
            }
        }
    }

    const jsContent = `// Auto-generated from CSV\nconst flashcardData = ${JSON.stringify(flashcards, null, 4)};\n`;
    fs.writeFileSync(path.join(__dirname, 'js/hsrp-flashcards-data.js'), jsContent);
    console.log('Successfully converted CSV to JS data format!');
}

processLineByLine().catch(console.error);
