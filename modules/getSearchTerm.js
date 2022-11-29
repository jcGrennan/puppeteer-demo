const process = require("process")

function searchTerm() {
    const searchArgs = []
    for(let i = 2; i < process.argv.length; i++) {
        searchArgs.push(process.argv[i])
    }
    
    if(process.argv[2]) {
        return searchArgs.join(" ")
    } else {
        return "cakes"
    }
}

module.exports = searchTerm