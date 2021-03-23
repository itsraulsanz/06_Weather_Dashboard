var formEl = document.querySelector('.our-form')
var firstNameEl = document.querySelector('#first-name')
var lastNameEl = document.querySelector('#last-name')
var listOfSubsEl = document.querySelector('#repos-container')
var localDataArray = localStorage.getItem('localDataArray')
var arrOfData = JSON.parse(localDataArray)

formEl.addEventListener('submit', function (event) {
    event.preventDefault()
    var firstNameValue = firstNameEl.value.trim()
    var lastNameValue = lastNameEl.value.trim()
    var data = {
        firstNameValue, lastNameValue
    }
    arrOfData.push(data)
    var arrOfDataJSONStr = JSON.stringify(arrOfData)
    localStorage.setItem('localDataArray', arrOfDataJSONStr)
    clearForm();
});

function clearForm () {
    firstNameEl.value = ''
    lastNameEl.value = ''
}

