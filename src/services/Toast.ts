export const anotherToast = {
  show: (message: string, duration: number = 4000) => {
    anotherToast.show(message, duration);
  },
};

anotherToast.show("Hello World");

console.log(anotherToast);
