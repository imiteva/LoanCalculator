
//Selector
const loanType = document.querySelector(".loan-type");
const loanResult = document.querySelector(".submit"); 
const scheduleTable = document.querySelector(".table"); 
 
//Event Listener
loanType.addEventListener("click", chooseloanType);
loanResult.addEventListener("click", computeResults);

//Functions
function computeResults(e) {

  var amount =  document.getElementById("amount").value; 
  const interest = document.getElementById("interest").value;
  const years = document.getElementById("years").value;
 
  //required fields
  var reqValues = document.getElementsByClassName("required")

  for(var i = 0; i < reqValues.length; i++) {
          if (reqValues[i].value == "") {
            return false;
          }
  }
   
  // Calculate
  var principal = parseFloat(amount); 
  var calculateInterest = parseFloat(interest) / 100 / 12; 
  var calculatedPayments = parseFloat(years) * 12; 

  //Compute monthly Payment
  const x = Math.pow(1 + calculateInterest, calculatedPayments); 
  const monthly = (principal * x * calculateInterest) / (x - 1);
  const monthlyPayment = monthly.toFixed(2);

  //Compute Interest
  const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);

  //Compute Total Payment
  const totalPayment = (monthly * calculatedPayments).toFixed(2);
  
//Show results
  document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPayment;
  document.getElementById("totalInterest").innerHTML = "%" + totalInterest;
  document.getElementById("totalPayment").innerHTML = "$" + totalPayment;  

 //start date
  n =  new Date();
  document.getElementById("startDate").innerHTML =  n.getDate()  + "/" + (n.getMonth() + 1) + "/" + n.getFullYear();

  // get all months between 
  var monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  var count = (parseInt(document.getElementById("years").value)) * 12; 
  m = n.getMonth()+1; 
  y = n.getFullYear();

   for(var i = m; i < count; i++ ){
    if (i==12) { i=0 , count = count - (12-m), m=0, y = y+1}  
    
    // create tr 
     const amortizationTr = document.createElement("tr");
     amortizationTr.classList.add("amortization-body");  

    // create td
     const month = document.createElement("td");
     month.innerText= monthNames[i] + ' ' + y; 
     month.classList.add("amortization-item"); 
     amortizationTr.appendChild(month);

     const principalAmount = document.createElement("td");
     principalAmount.innerText= (monthlyPayment - (amount*(calculateInterest))).toFixed(2);
     principalAmount.classList.add("amortization-item"); 
     amortizationTr.appendChild(principalAmount);

     const interestAmount = document.createElement("td");
     interestAmount.innerText = (amount*calculateInterest).toFixed(2); 
     interestAmount.classList.add("amortization-item"); 
     amortizationTr.appendChild(interestAmount);
     
     scheduleTable.appendChild(amortizationTr); 

     amount = amount-monthlyPayment; 
 }
 e.preventDefault();
}

function chooseloanType(type){
  // setting the interest rate  
  if(type.target.value === "housing-loan") {
     document.getElementById("interest").value = 3.5;  
    }else  if(type.target.value === "car-loan") {
     document.getElementById("interest").value = 4; 
    } else {
      document.getElementById("interest").value = 5;
    }
}
