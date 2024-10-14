//A closure to increase a numeric value without repeating it after every rendering

const counter = (function () {
  let privateCounter: number = 0;
  function changeBy(val: number): void {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    value(): number {
      return privateCounter;
    },
  };
})();

export const uniqueKey = (): string => {
  const getRamdomInt = (max: number) => Math.floor(Math.random() * max);

  counter.increment();
  return `${new Date().getTime().toString()}-${getRamdomInt(
    10000000
  ).toString()}-${counter.value()}`;
};
