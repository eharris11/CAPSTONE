
function toggle(id, event) {
    const section = document.getElementById(id);
    section.classList.toggle("open");
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("modules")) || {};

    document.querySelectorAll(".module-check").forEach(cb => {
        const name = cb.dataset.module;
        if (saved[name]) {
            cb.checked = true;
            cb.closest(".card").classList.add("completed");
        }

        cb.addEventListener("change", () => {
            const data = JSON.parse(localStorage.getItem("modules")) || {};
            data[name] = cb.checked;
            localStorage.setItem("modules", JSON.stringify(data));

            if (cb.checked) {
                cb.closest(".card").classList.add("completed");
            } else {
                cb.closest(".card").classList.remove("completed");
            }
        });
    });
});