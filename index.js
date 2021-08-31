const { exec } = require("child_process");

exec("dir", (error, stdout, stderr) => {
    
    if (error) {
        console.log(`shit hit the fun...${error.message}`);
        return;
    }

    if (stderr) {
        console.log(`std error...${error.message}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});