function getRandomNum(max, min) {
    let num = Math.floor(Math.random() * max)
    if(num < min) {
        return 5
    } else {
        return num
    }
}

module.exports = getRandomNum