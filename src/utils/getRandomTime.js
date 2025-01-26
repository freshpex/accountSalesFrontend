export const getRandomTime = () => {
    let hours = Math.floor(Math.random() * 24);
    let minutes = Math.floor(Math.random() * 60);
    let seconds = Math.floor(Math.random() * 60);

    let time = hours + "hr " + minutes + "m " + seconds + "s";
    return time;
}