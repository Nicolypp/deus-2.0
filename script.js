// script.js

let prayerQueue = [];

const categoryPriority = {
    "saude": 3,
    "dinheiro": 2,
    "amor": 1
};

function addPrayer(title, description, category, conditionVerified) {
    const priority = categoryPriority[category] + (conditionVerified ? 3 : 0);
    const prayer = {
        title,
        description,
        category,
        conditionVerified,
        priority,
        time: Date.now()
    };
    prayerQueue.push(prayer);
    sortQueue();
    renderQueue();
}

function sortQueue() {
    prayerQueue.sort((a, b) => {
        if (b.priority === a.priority) {
            return a.time - b.time; // mais antigo primeiro
        }
        return b.priority - a.priority; // prioridade maior primeiro
    });
}

function renderQueue() {
    const list = document.getElementById("prayerQueue");
    list.innerHTML = "";
    prayerQueue.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${p.title}</strong> — ${p.category}  
            <br><em>Condição: ${p.conditionVerified ? "Verificada" : "Não verificada"}</em>
            <br><small>Prioridade: ${p.priority}</small>
        `;
        list.appendChild(li);
    });
}

document.getElementById("prayerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const conditionVerified = document.getElementById("condition").value === "true";

    addPrayer(title, description, category, conditionVerified);

    this.reset();
});
