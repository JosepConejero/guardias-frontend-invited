//A closure to increase a numeric value without repeating it after every rendering

const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    value() {
      return privateCounter;
    },
  };
})();

export const uniqueKey = () => {
  const getRamdomInt = (max) => Math.floor(Math.random() * max);

  counter.increment();
  return `${new Date().getTime().toString()}-${getRamdomInt(
    10000000
  ).toString()}-${counter.value()}`;
};
