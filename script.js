let interval;
let binary;

function init(){
    const btn = document.createElement('button');
    btn.textContent = "I'm ready to start";
    btn.id = 'change';
    document.querySelector('#redo').innerHTML = '';
    document.querySelector('#redo').appendChild(btn);
    const count = 32;
    binary = getRandomBinary(count);

    renderLights(count);

    document.querySelectorAll('.lamp').forEach((lamp, index) => {
        lamp.onclick = e => {};   
    });
    
    btn.onclick = e => {
        changeOne(count);
    };
}
function renderLights(count){
    const app = document.querySelector('#app');

    app.innerHTML = '';

    for(let i = 0; i < count; i++){
        const container = document.createElement('div');
        const element = document.createElement('div');

        container.classList.add('lamp-cont');
        element.classList.add('lamp');

        element.style.backgroundColor = binary.charAt(i) === '0' ? 'black' : 'yellow';

        container.appendChild(element);
        app.appendChild(container);
    }

    let num = count;

    for(let mult = 1; true; mult *= 2){
        const root = Math.sqrt(num);

        if(root % 1 === 0){
            app.style.gridTemplateRows = `repeat(${root}, 1fr)`;
            app.style.gridTemplateColumns = `repeat(${root * mult}, 1fr)`;
            break;
        }

        num /= 2;
    }

    interval = setInterval(() => {
        changeOne(count);
    }, 5 * 1000 * 60);
}
function getRandomBinary(count){
    let str = "";

    for(let i = 0; i < count; i++){
        str += ~~(Math.random() * 2);
    }

    return str;
}
function changeOne(count){
    const app = document.querySelector('#app');
    const btn = document.querySelector('#change');

    btn.remove();
    clearInterval(interval);

    app.style.opacity = '0';

    const rnd = ~~(Math.random() * count);

    document.querySelectorAll('.lamp')[rnd].style.backgroundColor = binary.charAt(rnd) == '0' ? 'yellow' : 'black';

    setInterval(() => {
        app.style.opacity = '1';
        
        document.querySelectorAll('.lamp').forEach((lamp, index) => {
            lamp.onclick = e => {
                if(index === rnd){
                    alert('You win!');
                }
                else{
                    const num = (rnd + 1).toString();
                    alert(`You lose! The correct answer was the ${num}${
                        num.charAt(num.length - 2) === '1' ? 'th' : 
                        num.endsWith('1') ? 'st' : 
                        num.endsWith('2') ? 'nd' : 
                        num.endsWith('3') ? 'rd' : 'th'
                    } lamp`);
                }

                init();
            };
        });
    }, 2000);
}

init();
