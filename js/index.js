
function $(selector) {
    return document.querySelector(selector);
}

const createJsonWords = async () => {
    const response = await fetch('../world.json');
    const result = await response.json();
    const {practice} = result;

    const number = Math.floor(Math.random() * practice.length);
    const {mission} = practice[number]
    return mission;
}



/* 리셋 클릭 했을 때 글자 생성 */
const handleClick = async () => {
    const missionElement = $('.mission');
    missionElement.innerHTML = "";

    const mission = await createJsonWords();

    mission.split("").map(word => {
        const divElement = document.createElement('div')
        divElement.classList.add('word');
        /* 출력문자 물음표로 변경 */
        const replaceStar = word !== " " ? word.replace(word, '?') : word.replace(word, ' ') 

        divElement.innerHTML = `<h3>${replaceStar}</h3><span></span>`;
        missionElement.append(divElement);
    })

}

handleClick();

$('button').addEventListener('click', handleClick);

