const daysInput = document.getElementById('days');
const daysValue = document.getElementById('days_Value');

daysInput.addEventListener('input', function() {
    daysValue.textContent = this.value;
});

const buttons = document.querySelectorAll('.icon-group button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('icon-current'));
        this.classList.add('icon-current');
    });
});





const colorButtons = document.querySelectorAll('.color-group button');

colorButtons.forEach(button => {
    button.addEventListener('click', function(){
        colorButtons.forEach(btn => btn.classList.remove('color-current'));
        this.classList.add('color-current');
    });
});





document.getElementById('habitForm').addEventListener('submit', function(e){
    e.preventDefault();

    const habit = {
        id: Date.now(),
        name: document.getElementById('title').value,
        description: document.getElementById('description').value,
        icon: document.querySelector('.icon-current').textContent,
        color: window.getComputedStyle(document.querySelector('.color-current .circle')).backgroundColor,
        days: parseInt(daysValue.textContent, 10),
        currentDays: parseInt('0'),
    };

    const habits = JSON.parse(localStorage.getItem('habitsList')) || [];
    habits.push(habit);
    localStorage.setItem('habitsList', JSON.stringify(habits));

    window.location.href = 'myHabbits.html';
})


