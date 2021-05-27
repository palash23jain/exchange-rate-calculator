// getting DOM elements into constants
const selectTag = document.querySelectorAll('select');
const rateText = document.querySelector('#rate');
const amt1 = document.querySelector('#amt-1');
const amt2 = document.querySelector('#amt-2');
const curr1= document.querySelector('#currency-1');
const curr2= document.querySelector('#currency-2');
const swapButton = document.querySelector('.btn');

fetch('https://openexchangerates.org/api/currencies.json')
.then(res => res.json())
.then(res=>{
    selectTag.forEach(eachSelectTag=>{
        Object.keys(res).forEach(currency =>{
            const optionTag = document.createElement('option');
            eachSelectTag.appendChild(optionTag);
            optionTag.innerHTML = currency; 
        })
    })
    rateText.innerHTML = `1${curr1.value} is equal to 1${curr2.value} `
})
.then(()=>{
    let listnerFunc = (domEle, event)=>{
        domEle.addEventListener(event,()=>{
            fetch(`https://free.currconv.com/api/v7/convert?q=${curr1.value}_${curr2.value}&compact=ultra&apiKey=5e005b1a621568d4fc74`)
            .then(res =>res.json())
            .then(res=>{
                amt2.value = amt1.value * Object.values(res);
                rateText.innerHTML = `1${curr1.value} is equal to ${Object.values(res)} ${curr2.value}`
            });
            
        })
    }
    listnerFunc(amt1, 'input');
    listnerFunc(curr1, 'change');
    listnerFunc(curr2, 'change'); 
    swapButton.addEventListener('click',()=>{
        let temp = curr1.value;
        curr1.value = curr2.value;
        curr2.value = temp;
        fetch(`https://free.currconv.com/api/v7/convert?q=${curr1.value}_${curr2.value}&compact=ultra&apiKey=5e005b1a621568d4fc74`)
        .then(res =>res.json())
        .then(res=>{
            amt2.value = amt1.value * Object.values(res);
            rateText.innerHTML = `1${curr1.value} is equal to ${Object.values(res)} ${curr2.value}`
        });

    })
}
)

