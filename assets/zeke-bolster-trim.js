const trimSelector = document.querySelector('#Option-template--15603918995536__main-1');
const trimColorSelector = document.querySelector('#Option-template--15603918995536__main-2');
const container = document.querySelector('.selector-wrapper');
const thirdChild = container.children[2]; // Index starts at 0
console.log(thirdChild);  


console.log(trimSelector.value);
console.log(trimColorSelector);

trimSelector.addEventListener('change', function() {
    if (trimSelector.value == 'No Trim') {
        console.log('it worked');
        thirdChild.style.display = 'none'
        trimColorSelector.value = 'No Trim'
            
    } else {
        thirdChild.style.display = ''
        trimColorSelector.value = 'Lavender'
    }
});

trimColorSelector.addEventListener('change', function() {
    if (trimSelector.value != 'No Trim' && trimColorSelector.value == 'No Trim') {
        console.log('it worked');
        thirdChild.style.display = 'none'
        trimSelector.value = 'No Trim'
            
    } else {
        thirdChild.style.display = ''
        
     }
    });