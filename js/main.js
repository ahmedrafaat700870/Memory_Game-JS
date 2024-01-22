document.querySelector('.control-buttons span').onclick = function() {
    let userName = prompt(`What's your naaaaam :`) ;
    if (userName == null || userName== "") {
        document.querySelector('.name span').innerHTML = "Unkowen" ;
    } else {
        document.querySelector('.name span').innerHTML = userName ;
    }
    document.querySelector('.control-buttons').remove() ;
}
let duerations = 1000  ;
let blockcontainer = document.querySelector('.memory-game-blocks') ;
let blocks = Array.from(blockcontainer.children) ;
// let a = [...Array(blocks.length).keys()] ;
// let b = [...blocks.keys()] ;
let orderRange = [] ;
for (let i = 0 ; i < blocks.length ; i++ ) {
    orderRange[i] = i ;
}
shufel(orderRange) ;
console.log(orderRange) ;
blocks.forEach((block,index) => {
    block.style.order = orderRange[index] ;
    block.addEventListener('click', function() {
        flibBlock(block) ; 
    }) ;
});
function shufel (array) {
    let curent = array.length ,
        temp,
        random ;
    while (curent > 0) {
        random = Math.floor(Math.random() * curent) ;   
        curent-- ;
        temp = array[curent] ;
        array[curent] = array[random] ;
        array[random] = temp ;
    }
    return array ;
}
//  old array[0 ,1 ,2 ,3 ,4 ,5 ,6 7 ,8 ,9 ,10]
// temp = array[curent] ;
// save in box ;
// array[curent] = array[random] ;
// array[random] = temp ;
//  new array[10 ,1 ,2 ,3 ,4 ,9 ,6 7 ,8 ,5 ,0]
function flibBlock (selcted) {
    selcted.classList.add('is-flipped') ;
    let count = blocks.filter(index => index.classList.contains('is-flipped')) ;
    if(count.length === 2) {
        // stop clicking 
        stopclicking() ;
        // funtion checked matched card . 
        checkMatched(count[0],count[1]) ;
    }
} 
function stopclicking() {
    blockcontainer.classList.add('no-clicking') ;
    // start clicking after 1 s . 
    setTimeout(function()  {
        blockcontainer.classList.remove('no-clicking') ;
    } , duerations) ;
}
function checkMatched (first,second) {
    let tries = document.querySelector('.tries span')
    if(first.dataset.technology === second.dataset.technology) {
        first.classList.remove('is-flipped') ;
        second.classList.remove('is-flipped') ;
        first.classList.add('has-matched') ;
        second.classList.add('has-matched') ;
        document.querySelector('#saccess').play() ;
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        setTimeout(function () {
            first.classList.remove('is-flipped') ;
            second.classList.remove('is-flipped') ;
        }, duerations) ;
        document.querySelector('#faild').play() ;
    }
}
