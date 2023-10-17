// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.
// Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

// Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// При разработке используйте Bootstrap для стилизации элементов.


document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displaySchedule(data.schedule);
        })
        .catch(function (error) {
            console.log("Error loading schedule data:", error);
        });
});

function displaySchedule(schedule) {
    const sheduleBox = document.querySelector('.shedule');

    schedule.forEach(element => {
        const item = createItem(element);
        sheduleBox.append(item);
    });
}

function createItem(element) {
    const card = document.createElement('div');
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.className = "card-body bg-light";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = element.name;

    const time = document.createElement("p");
    time.className = "card-text";
    time.textContent = "Время: " + element.time;

    const participants = document.createElement("p");
    participants.className = "card-text";
    participants.textContent = "Участники: " + element.currentParticipants + "/" + element.maxParticipants;

    const addButton = document.createElement("button");
    addButton.className = "btn btn-primary";
    addButton.textContent = "Записаться";
    addButton.addEventListener("click", () => {
        if (element.currentParticipants < element.maxParticipants) {
            element.currentParticipants++;
            participants.textContent = "Участники: " + element.currentParticipants + "/" + element.maxParticipants;
            updateButtonState();
        }
    });

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-danger";
    cancelButton.textContent = "Отменить запись";
    cancelButton.addEventListener("click", () => {
        if (element.currentParticipants > 0) {
            element.currentParticipants--;
            participants.textContent = "Участники: " + element.currentParticipants + "/" + element.maxParticipants;
            updateButtonState();
        }
    });

    function updateButtonState() {
        if (element.currentParticipants === element.maxParticipants) {
            addButton.setAttribute("disabled", "disabled");
        } else {
            addButton.removeAttribute("disabled");
        }

        if (element.currentParticipants === 0) {
            cancelButton.setAttribute("disabled", "disabled");
        } else {
            cancelButton.removeAttribute("disabled");
        }
    }

    updateButtonState();

    cardBody.appendChild(title);
    cardBody.appendChild(time);
    cardBody.appendChild(participants);
    cardBody.appendChild(addButton);
    cardBody.appendChild(cancelButton);

    card.appendChild(cardBody);

    return card;
}
