const root = document.documentElement;
let button = document.getElementById('toggleButton')


const colors = [
    ['#333446','#B8CFCE','#7F8CAA','#EAEFEF'],
    ['#0B1D51','#8CCDEB','#725CAD','#FFE3A9'],
    ['#63C8FF','#FDFFB8','#4DFFBE','#FF2DD1'],
    ['#2D4059','#EA5455','#F07B3F','#FFD460'],

]
toggleButton.addEventListener('click', () => {
    let randomColorArray = colors[Math.floor(Math.random() * 3)]
    root.style.setProperty('--mainColor2', randomColorArray[0]);
    root.style.setProperty('--subColor2_1', randomColorArray[1]);
    root.style.setProperty('--subColor2_2', randomColorArray[2]);
    root.style.setProperty('--subColor2_3', randomColorArray[3]);
    console.log(randomColorArray)
})

