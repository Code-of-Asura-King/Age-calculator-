const Day = document.querySelector("#Day");
const Month = document.querySelector("#Month");
const Year = document.querySelector("#Year");

const AgeDay = document.querySelector("#day");
const AgeMonth = document.querySelector("#month");
const AgeYear = document.querySelector("#year");

const date = new Date();

const CurrentDate = {
    Cday: date.getDate(),
    Cmonth: date.getMonth() + 1,
    Cyear: date.getFullYear()

}



function isLeapYear(year) {
    if ((year % 400 == 0) ||
        (year % 100 != 0) &&
        (year % 4 == 0)) {
        return true;
    }
    else {
        return false;
    }
}

function SetDay(month, Year) {
    if (isLeapYear(Year)) {
        switch (month) {
            case 1:
                return 31;
            case 2:
                return 29;
            case 3:
                return 31;
            case 4:
                return 30;
            case 5:
                return 31;
            case 6:
                return 30;
            case 7:
                return 31;
            case 8:
                return 31;
            case 9:
                return 30;
            case 10:
                return 31;
            case 11:
                return 30;
            case 12:
                return 31;
            default:
                return -1;
        }
    }
    else {
        switch (month) {
            case 1:
                return 31;
            case 2:
                return 28;
            case 3:
                return 31;
            case 4:
                return 30;
            case 5:
                return 31;
            case 6:
                return 30;
            case 7:
                return 31;
            case 8:
                return 31;
            case 9:
                return 30;
            case 10:
                return 31;
            case 11:
                return 30;
            case 12:
                return 31;
            default:
                return -1;
        }

    }
}

document.querySelector(".arrow").addEventListener("click", (e) => {
    e.preventDefault();
    AgeDay.textContent = "--";
    AgeMonth.textContent = "--";
    AgeYear.textContent = "--";
    validateInputs();

})

function SetError(ele, message) {
    const parentEle = ele.parentElement;
    let errorEle = parentEle.querySelector(".error");
    errorEle.textContent = message;
    parentEle.childNodes[1].classList.add("red");
    parentEle.childNodes[3].classList.add("border-red");
}

function SetSuccess(ele) {
    const parentEle = ele.parentElement;
    let errorEle = parentEle.querySelector(".error");
    errorEle.textContent = "";
    parentEle.childNodes[1].classList.remove("red");
    parentEle.childNodes[3].classList.remove("border-red");
    return 1;

}

function ValidateDay(day, month, year) {
    if(day<=SetDay(month,year)){
        return true;
    }
    else{
        return false;
    }         
    
}

function calculateAge(BirthDate, CurrentDate) {
    let Age = {
        days: 0,
        months: 0,
        years: 0
    }

    let Cday = CurrentDate.Cday;
    let Cmonth = CurrentDate.Cmonth;
    let Cyear = CurrentDate.Cyear;
   
    let Bday = BirthDate.DayNumber;
    let Bmonth = BirthDate.MonthNumber;
    let Byear = BirthDate.YearNumber;
   
    if (Cday < Bday) {
        if (Cmonth < Bmonth) {
            Cyear--;
            Cday += SetDay(Cmonth, Cyear);
            Cmonth--;
            Cmonth += 12;
            Age.days = Cday - Bday;
            Age.months = Cmonth - Bmonth;
            Age.years = Cyear - Byear;
        }
        else {
            Cday += SetDay(Cmonth, Cyear);
            Cmonth--;
            Age.days = Cday - Bday;
            Age.months = Cmonth - Bmonth;
            Age.years = Cyear - Byear;
        }
    }
    else {
        if (Cmonth < Bmonth) {
            Cyear--;
            Cday += SetDay(Cmonth, Cyear);
            Cmonth--;
            Cmonth += 12;
            Age.days = Cday - Bday;
            Age.months = Cmonth - Bmonth;
            Age.years = Cyear - Byear;
        }
        else {
            Age.days = Cday - Bday;
            Age.months = Cmonth - Bmonth;
            Age.years = Cyear - Byear;
        }
    }
    
    AgeDay.textContent = Age.days;
    AgeMonth.textContent = Age.months;
    AgeYear.textContent = Age.years;

}




function validateInputs() {
    const DayValue = Day.value.trim();
    const MonthValue = Month.value.trim();
    const YearValue = Year.value.trim();
    let sd1 = 0;
    let sd2 = 0;
    let sd3 = 0;
    let BirthDate = {
        DayNumber: parseInt(Day.value),
        MonthNumber: parseInt(Month.value),
        YearNumber: parseInt(Year.value)
    }
    
        
    if (DayValue === "") {
        SetError(Day, "This field is required");
    }
    else if (BirthDate.DayNumber >31) {
        SetError(Day, "Must be a valid day");
        console.log("false")
    }
    else if((BirthDate.DayNumber === 31) && (BirthDate.DayNumber !== SetDay(BirthDate.MonthNumber, BirthDate.YearNumber))){
        SetError(Day, "Must be a valid date");
    }
    else {
        sd1 = SetSuccess(Day);
    }
    if (MonthValue === "") {
        SetError(Month, "This field is required");
    }
    else if ((BirthDate.MonthNumber > 12) || (BirthDate.MonthNumber < 0)) {
        console.log("month checking");
        SetError(Month, "Must be a valid month");
    }
    else {
        sd2 = SetSuccess(Month);
    }
    if (YearValue === "") {
        SetError(Year, "This field is required");
    }
    else if (BirthDate.YearNumber > CurrentDate.Cyear) {
        SetError(Year, "Must be in the past");
    }
     else if(BirthDate.YearNumber == CurrentDate.Cyear){
        if(BirthDate.MonthNumber > CurrentDate.Cmonth){
            SetError(Year, "Must be in the past");
        }
        else if(BirthDate.MonthNumber == CurrentDate.Cmonth){
            console.log("month equal")
            if(BirthDate.DayNumber > CurrentDate.Cday){
                SetError(Year, "Must be in the past");
            }
            else{
               
                sd1=SetSuccess(Day);
                calculateAge(BirthDate, CurrentDate);
            }

        }
        else {
            console.log("month less")
            
            if(BirthDate.DayNumber > CurrentDate.Cday){
                sd1=SetSuccess(Day);
                calculateAge(BirthDate, CurrentDate);
                
            }
            else{
                sd3 = SetSuccess(Year);
                calculateAge(BirthDate, CurrentDate);
            }
            sd2 = SetSuccess(Month);  
            calculateAge(BirthDate, CurrentDate);          
        }
    }
    else {
        sd3 = SetSuccess(Year);
        calculateAge(BirthDate, CurrentDate);
    }


    if ((sd1 != 0) && (sd2 != 0) && (sd3 != 0)) {
        calculateAge(BirthDate, CurrentDate);
    }   

}
