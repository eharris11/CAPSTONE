const checkboxes = document.querySelectorAll(".module-check");

window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("modules")) || {};

    checkboxes.forEach(cb => {
        const name = cb.dataset.module;
        cb.checked = saved[name] || false;
    });
});

checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        const saved = JSON.parse(localStorage.getItem("modules")) || {};
        const name = cb.dataset.module;

        saved[name] = cb.checked;

        localStorage.setItem("modules", JSON.stringify(saved));
    });
});

if (saved[name]) {
    cb.checked = true;
    cb.closest(".card").classList.add("completed");
}

cb.addEventListener("change", () => {
    const saved = JSON.parse(localStorage.getItem("modules")) || {};
    const name = cb.dataset.module;

    saved[name] = cb.checked;
    localStorage.setItem("modules", JSON.stringify(saved));

    if (cb.checked) {
        cb.closest(".card").classList.add("completed");
    } else {
        cb.closest(".card").classList.remove("completed");
    }
});