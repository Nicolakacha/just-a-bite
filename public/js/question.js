function init() {
  const questions = document.querySelector(".questions");
  questions.addEventListener("click", (e) => {
    let target = e.target.closest(".group").getAttribute("data-id");
    document.querySelectorAll(".answer")[target-1].classList.toggle("hide");
  });
  
}

document.addEventListener("DOMContentLoaded", init);
