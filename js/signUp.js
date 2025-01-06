document.addEventListener("DOMContentLoaded", function () {
    const slidePage = document.querySelector(".slide-page");
    const nextBtnFirst = document.querySelector(".firstNext");
    const prevBtnSec = document.querySelector(".prev-1");
    const nextBtnSec = document.querySelector(".next-1");
    const prevBtnThird = document.querySelector(".prev-2");
    const nextBtnThird = document.querySelector(".next-2");
    const prevBtnFourth = document.querySelector(".prev-3");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    let current = 1;

    const ime = document.getElementById("ime");
    const prezime = document.getElementById("prezime");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");
    const danSelect = document.getElementById('dan');
    const mesecSelect = document.getElementById('mesec');
    const godinaSelect = document.getElementById('godina');
    const pol = document.getElementById("pol");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");

    nextBtnFirst.addEventListener("click", function (event) {
        event.preventDefault();
        if (validatePage(0)) {
            slidePage.style.marginLeft = "-25%";
            bullet[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            current += 1;
        }
    });

    nextBtnSec.addEventListener("click", function (event) {
        event.preventDefault();
        if (validatePage(1)) {
            slidePage.style.marginLeft = "-50%";
            bullet[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            current += 1;
        }
    });

    nextBtnThird.addEventListener("click", function (event) {
        event.preventDefault();
        if (validatePage(2)) {
            slidePage.style.marginLeft = "-75%";
            bullet[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            current += 1;
        }
    });

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validatePage(3)) {
            bullet[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            current += 1;

            setTimeout(function () {
                window.location.href = "shop.html"; 
            }, 200);
        }
    });

    prevBtnSec.addEventListener("click", function (event) {
        event.preventDefault();
        slidePage.style.marginLeft = "0%";
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        progressText[current - 2].classList.remove("active");
        current -= 1;
    });

    prevBtnThird.addEventListener("click", function (event) {
        event.preventDefault();
        slidePage.style.marginLeft = "-25%";
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        progressText[current - 2].classList.remove("active");
        current -= 1;
    });

    prevBtnFourth.addEventListener("click", function (event) {
        event.preventDefault();
        slidePage.style.marginLeft = "-50%";
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        progressText[current - 2].classList.remove("active");
        current -= 1;
    });

    let danOptions = '';
    for (let i = 1; i <= 31; i++) {
        danOptions += `<option value="${i}">${i}</option>`;
    }
    danSelect.innerHTML = `<option value="">Dan</option>` + danOptions;

    let mesecOptions = '';
    for (let i = 1; i <= 12; i++) {
        mesecOptions += `<option value="${i}">${getMonthName(i)}</option>`;
    }
    mesecSelect.innerHTML = `<option value="">Mesec</option>` + mesecOptions;

    let godinaOptions = '';
    for (let i = 1920; i <= 2024; i++) {
        godinaOptions += `<option value="${i}">${i}</option>`;
    }
    godinaSelect.innerHTML = `<option value="">Godina</option>` + godinaOptions;

    function validatePage(pageIndex) {
        let isValid = true;

        const usernameRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/;

        switch (pageIndex) {
            case 0:
                if (!ime.value.trim() || ime.value.trim().length < 3) {
                    isValid = false;
                    alert("Ime mora imati najmanje 3 slova.");
                }

                if (!prezime.value.trim() || prezime.value.trim().length < 4) {
                    isValid = false;
                    alert("Prezime mora imati najmanje 4 slova.");
                }
                break;
            case 1:
                if (!email.value.trim() || !validateEmail(email.value)) {
                    isValid = false;
                    alert("Unesite ispravnu email adresu.");
                }

                if (!telefon.value.trim() || !validatePhone(telefon.value)) {
                    isValid = false;
                    alert("Unesite ispravan broj telefona.");
                }
                break;
            case 2:
                const dan = parseInt(danSelect.value);
                const mesec = parseInt(mesecSelect.value);
                const godina = parseInt(godinaSelect.value);

                if (!dan || !mesec || !godina) {
                    isValid = false;
                    alert("Morate selektovati dan, mesec i godinu.");
                } else {
                    if (!isValidDate(dan, mesec, godina)) {
                        isValid = false;
                        alert("Izabrali ste nevalidan datum.");
                    }

                    const birthDate = new Date(godina, mesec - 1, dan);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    const dayDiff = today.getDate() - birthDate.getDate();

                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                        age--;
                    }

                    if (age < 18) {
                        isValid = false;
                        alert("Ne mož");
                    }
                }

                if (!pol.value) {
                    isValid = false;
                    alert("Pol je obavezan.");
                }
                break;

            case 3:
                if (!username.value.trim() || !usernameRegex.test(username.value)) {
                    isValid = false;
                    alert("Username mora imati najmanje 6 karaktera i barem 1 broj.");
                }

                if (!password.value.trim() || !validatePassword(password.value)) {
                    isValid = false;
                    alert("Lozinka mora imati najmanje 10 karaktera:\n Makar 1 veliko slovo\n Makar 1 broj\n Makar 1 specijalni karakter");
                }

                if (password.value !== password2.value) {
                    isValid = false;
                    alert("Lozinka i potvrda lozinke se moraju poklapati.");
                }
                break;
        }

        return isValid;
    }

    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day); 
        return date.getDate() === day; 
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{10,}$/;
        return passwordRegex.test(password);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|rs)$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^06\d{8}$/;
        return phoneRegex.test(phone);
    }

    function getMonthName(month) {
        const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
        return months[month - 1];
    }
});
