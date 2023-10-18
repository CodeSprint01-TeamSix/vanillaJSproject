
function $(selector) {
    return document.querySelector(selector);
}


const handleClick = async () => {
    const missionElement = $('.mission');
    missionElement.innerHTML = "";

    const response = await fetch('../world.json');
    const result = await response.json();
    const {practice} = result;

    
    const number = Math.floor(Math.random() * practice.length);
    const {mission} = practice[number]

    mission.split("").map(word => {
        const divElement = document.createElement('div')
        divElement.classList.add('word');
        divElement.innerHTML = `<h3>${word}</h3><span></span>`;
        missionElement.append(divElement)
    })

}


$('button').addEventListener('click', handleClick);

