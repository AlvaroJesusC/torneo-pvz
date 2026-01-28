// después de 2 segundos
window.addEventListener('DOMContentLoaded', function () {
    const helpCard = document.getElementById('help-card');


    setTimeout(() => {
        helpCard.classList.add('show');
    }, 500);


    setTimeout(() => {
        if (helpCard.classList.contains('show')) {
            helpCard.classList.remove('show');
        }
    }, 7000);
});


function closeHelpCard() {
    const helpCard = document.getElementById('help-card');
    helpCard.classList.remove('show');
}

window.closeHelpCard = closeHelpCard;
