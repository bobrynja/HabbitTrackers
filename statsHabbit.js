document.addEventListener('DOMContentLoaded', function() {
  loadHabits();
});


function loadHabits() {
    const habits = JSON.parse(localStorage.getItem('habitsList')) || [];
    const container = document.getElementById('habits-container');

    
    if (habits.length === 0) {
        container.innerHTML = '<p>Привычек пока нет. Создайте первую!</p>';
        return;
    }

    container.innerHTML = habits.map(habit => `
        <div class="habit-card" style="border-left: 5px solid ${habit.color}">
        <div class="info">
        <div class="hero">
        <div class="habit-icon">${habit.icon}</div>
        <h3>${habit.name}</h3>
        </div>
        <small>Создано: ${new Date(habit.id)}</small>
        <p>Серия: ${habit.currentDays} дней.   До цели: ${habit.days-habit.currentDays} дней</p><br>
        <progress class="habit-progress" value="${habit.currentDays}" max="${habit.days}"></progress>
        <span class="progress-value">${Math.round(((habit.currentDays || 0)/habit.days)*100)}%</span>
    </div>
    </div>
    `).join('');

document.querySelectorAll('.habit-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });
  
  const kolvo = document.getElementById('kolvo');

  kolvo.textContent = habits.length;
}
