import {Notify} from 'notiflix';


const promisesForm = document.querySelector('.form');
promisesForm.addEventListener('click', onPromisesForm);
console.dir(promisesForm)
function onPromisesForm (event) {
event.preventDefault();
const { amount, delay, step } = promisesForm.elements;
const submitButton = promisesForm.lastElementChild;
let delayTime = Number(delay.value);
  for (let index = 1; index <= amount.value; index++) {
createPromise(index, delayTime)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delayTime += Number(step.value);

};
// promisesForm.reset()
submitButton.disabled = true;
setTimeout (() => {submitButton.disabled = false;}, delayTime)
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject ({position, delay})
    }}, delay)
  })
}
