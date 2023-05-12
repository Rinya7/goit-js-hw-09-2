import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputFromUser: document.querySelectorAll('input'),
  formSendToPromiseCreadte: document.querySelector('.form'),
};

refs.formSendToPromiseCreadte.addEventListener('submit', callback);

function callback(evtent) {
  evtent.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;

  console.log(step.value);
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i + 1, Number(delay.value) + Number(step.value * i))
      .then(messOk => Notify.success(messOk))
      .catch(messError => Notify.failure(messError));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
