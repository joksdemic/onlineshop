function validateForm(event) {
    var name = document.getElementById("name");
    var country = document.getElementById("country");
    var city = document.getElementById("city");
    var postalCode = document.getElementById("postalCode");
    var address = document.getElementById("address");
    var apartment = document.getElementById("apartment");
    var cardOwner = document.getElementById("cardOwner");
    var expiryDate = document.getElementById("expiryDate");
    var cardNumber = document.getElementById("cardNumber");
    var cvvCode = document.getElementById("cvvCode");

    var inputs = [name, country, city, postalCode, address, apartment, cardOwner, expiryDate, cardNumber, cvvCode];
    inputs.forEach(function(input) {
        input.classList.remove("invalid-input"); 
    });

    if (name.value == "" || country.value == "" || city.value == "" || postalCode.value == "" || address.value == "" || apartment.value == "" || cardOwner.value == "" || expiryDate.value == "" || cardNumber.value == "" || cvvCode.value == "") {
        alert("Molimo Vas da popunite sva polja");
        return false;
    }

    var namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!namePattern.test(name.value)) {
        alert("Molimo Vas da unesete validno ime i prezime");
        name.classList.add("invalid-input"); 
        return false; 
    }

    var letterOnlyPattern = /^[a-zA-Z\s]+$/; 
    if (!letterOnlyPattern.test(country.value)) {
        alert("Polje može sadržati samo slova");
        country.classList.add("invalid-input"); 
        return false; 
    }
    if (!letterOnlyPattern.test(city.value)) {
        alert("Polje može sadržati samo slova");
        city.classList.add("invalid-input"); 
        return false; 
    }
    if (!letterOnlyPattern.test(address.value)) {
        alert("Polje može sadržati samo slova");
        address.classList.add("invalid-input"); 
        return false; 
    }
    if (!letterOnlyPattern.test(cardOwner.value)) {
        alert("Polje može sadržati samo slova");
        cardOwner.classList.add("invalid-input"); 
        return false; 
    }

    var postalCodePattern = /^[0-9]{5}$/;
    if (!postalCodePattern.test(postalCode.value)) {
        alert("Poštanski broj mora sadržati 5 cifara");
        postalCode.classList.add("invalid-input"); 
        return false; 
    }

    var cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!cardNumberPattern.test(cardNumber.value)) {
        alert("Broj kartice mora biti u formatu xxxx-xxxx-xxxx-xxxx");
        cardNumber.classList.add("invalid-input"); 
        return false; 
    }

    var cvvPattern = /^\d{3}$/;
    if (!cvvPattern.test(cvvCode.value)) {
        alert("CVV mora sadržati 3 cifre");
        cvvCode.classList.add("invalid-input");
        return false; 
    }

    var apartmentPattern =  /^[a-zA-Z0-9]{1,5}$/;
    if (!apartmentPattern.test(apartment.value)) {
        alert("Broj stana može biti kombinacija slova i brojeva maksimalne dužine 5 karaktera");
        apartment.classList.add("invalid-input"); 
        return false; 
    }

    // Validacija datuma isteka
    if (!validateDate(expiryDate.value)) {
        expiryDate.classList.add("invalid-input");
        return false;
    }

    return true; 
}

function validateDate(date) {
    var datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!datePattern.test(date)) {
        alert("Datum isteka mora biti u formatu MM/YY");
        return false;
    }

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();

    var [month, year] = date.split('/');

    month = parseInt(month);
    year = parseInt(year);

    if (year < 25 || year > 35 || (year === 25 && month < currentMonth)) {
        alert("Datum isteka mora biti između 2025. i 2035. godine");
        return false;
    }

    return true;
}



