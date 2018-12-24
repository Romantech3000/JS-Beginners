// Ta;as the temperature in Celcius and returns temperature in Farenheits
function celsiusToFarenheit (Tc) {
    return 9/5*Tc + 32;
}

// prompt the user to input the temperature in celcuus and displays 
// it converted into farenheits
function converter () {
var Tf;
var Tc;
var tmpStr;
    Tc = prompt ('Please input the temperature in Celsius', 0);

    if (Tc!=null) {    
        Tf = celsiusToFarenheit (Tc);
        alert ('The temperature in Celcius: ' + Tc + ' \nin Farenheit it\'s: ' + Tf);
        if (document.getElementById('logPar') != null) {
            tmpStr = document.getElementById('logPar').innerHTML;
            document.getElementById('logPar').innerHTML = tmpStr + 'Temperature '+ Tc + '&#8451; was converted to '+ Tf +'&#8457;<br>';
        }
    }
}

// assignments
function adminsName () {
var admin;
var name;
    name = 'Василий';
    admin = name;
    alert('admin: ' + admin);
}

// implicit conversion
function exprType () {
    alert (1000 + "108");
}