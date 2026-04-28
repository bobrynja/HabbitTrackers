document.addEventListener('DOMContentLoaded', function() {
  loadHabits();
});


function loadHabits() {
    const habits = JSON.parse(localStorage.getItem('habitsList')) || [];
    const container = document.getElementById('habits-container')

    if (habits.length === 0) {
        container.innerHTML = '<p>Привычек пока нет. Создайте первую!</p>';
        return;
    }

    container.innerHTML = habits.map(habit => `
        <div class="habit-card" style="border-left: 5px solid ${habit.color}">
        <label class="custom-checkbox"  style="border: 2px solid ${habit.color}">
            <input type="checkbox" class="habit-checkbox" data-id="${habit.id}" hidden>
            <span class="checkmark" style="color: ${habit.color}"></span>
        </label>
        <div class="info">
        <div class="hero">
        <div class="habit-icon">${habit.icon}</div>
        <h3>${habit.name}</h3>
        </div>
        <p>${habit.description}</p>
        <small>Серия: ${habit.currentDays} дней.   Цель: ${habit.days}</small><br>
        <progress class="habit-progress" value="${habit.currentDays}" max="${habit.days}"></progress>
        <span class="progress-value">${Math.round(((habit.currentDays || 0)/habit.days)*100)}%</span>
      <button class="btn btn-delete" data-id="${habit.id}">Удалить</button>
    </div>
    </div>
    `).join('');

    document.querySelectorAll('.habit-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

    document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', deleteHabit);
});

}


function updateProgress(event){
const checkbox = event.target;
const habitId = parseInt(checkbox.dataset.id);
const habits = JSON.parse(localStorage.getItem('habitsList')) || [];

const habit = habits.find(h => h.id === habitId);
if (!habit) return;

if (!habit.hasOwnProperty('currentDays')) {
        habit.currentDays = 0;
    }

if (checkbox.checked) {
    habit.currentDays = Math.min(habit.currentDays  + 1, habit.days);
} else {
    habit.currentDays = Math.max(0, habit.currentDays - 1);
}
localStorage.setItem('habitsList', JSON.stringify(habits));

const card = checkbox.closest('.habit-card');
const progressBar = card.querySelector('.habit-progress');
const progressValue = card.querySelector('.progress-value');
const smallText = card.querySelector('small');
progressBar.value = habit.currentDays;
progressValue.textContent = `${Math.round((habit.currentDays / habit.days) * 100)}%`;
smallText.textContent = `Серия: ${habit.currentDays} дней. Цель: ${habit.days}`;
}

function deleteHabit(event){
    const button = event.target;
    const habitId = parseInt(button.dataset.id);
    const habits = JSON.parse(localStorage.getItem('habitsList')) || [];
    const index = habits.findIndex(h => h.id === habitId);
    if (index === -1) return;
    habits.splice(index, 1);

    localStorage.setItem('habitsList', JSON.stringify(habits));

    loadHabits();
}




