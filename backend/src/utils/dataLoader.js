const fs = require('fs');
const path = require('path');

const loadSquadData = () => {
    const profilesDir = path.join(__dirname, '../data/profiles');
    
    // Check if directory exists
    if (!fs.existsSync(profilesDir)) {
        console.error("Profiles folder nahi mila!");
        return "";
    }

    const files = fs.readdirSync(profilesDir);
    let combinedData = "INFO ABOUT FRIENDS:\n\n";

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(profilesDir, file);
            try {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                if(fileData.trim() === "") return; // Skip empty files
                
                const jsonData = JSON.parse(fileData);
                combinedData += `Name: ${jsonData.name}\n`;
                combinedData += `Role: ${jsonData.role}\n`;
                combinedData += `Personality: ${jsonData.personality}\n`;
                combinedData += `Professional Info: ${jsonData.professional_info}\n`;
                combinedData += `Funny Stories: ${jsonData.college_stories}\n`;
                combinedData += `Roast Point: ${jsonData.roast_point}\n\n`;
            } catch (err) {
                console.log(`Skipping file ${file} (empty or invalid json)`);
            }
        }
    });

    return combinedData;
};

module.exports = { loadSquadData };