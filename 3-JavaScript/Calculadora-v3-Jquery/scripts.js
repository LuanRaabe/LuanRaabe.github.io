let calculator = () => {
  let operand1 = null;
  let operand2 = null;
  let operation = null;
  const setOperand1 = (data) => {
      operand1 = Number(data);
  }
  const setOperand2 = (data) => {
      operand2 = Number(data);
  }
  const setOperation = (data) => {
      operation = data;
  }
  const clearCalculator = () => {
      operand1 = null;
      operand2 = null;
      operation = null;
  }
  const getResult = () => {
      if (!operand1 || !operand2) return "Defina operadores";
      switch (operation) {
          case "+": return operand1 + operand2;
          case "-": return operand1 - operand2;
          case "*": return operand1 * operand2;
          case "/": return operand1 / operand2;
          default: return "Defina operação";
      }
  }
  return { setOperand1, setOperand2, setOperation, clearCalculator, getResult};
}

let calc = calculator();
let clearNextTime = false;
let firstCalc = true;

$(".inputNumber").click(function(event) {
  if(clearNextTime) {
    $("#screen").val("");
    clearNextTime = false;
  }
  $("#screen").val(function(i, orig){
    return orig + event.target.value;
  });
})

$(".operator").click(function(event) {
  calc.setOperation(event.target.value);
  $("#screenOperation").val(event.target.value);
  calc.setOperand1($("#screen").val());
  firstCalc = true;
  clearNextTime = true;
})

$(".result").click(function(){
  if(firstCalc){
    calc.setOperand2($("#screen").val());
    $("#screen").val(calc.getResult());
    firstCalc = false;
    clearNextTime = true;
  } else {
    calc.setOperand1($("#screen").val());
    $("#screen").val(calc.getResult());
  }
})

$(".reset").click(function(){
  $("#screen").val("");
  $("#screenOperation").val("");
  firstCalc = true;
  calc.clearCalculator();
})

$(".toggleSignal").click(function(){
  $("#screen").val((-1) * Number($("#screen").val()));
})

$(".erase").click(function(){
  $("#screen").val($("#screen").val().slice(0, -1));
})