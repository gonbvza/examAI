const is_dev = import.meta.env.DEV;

const HOST = is_dev ? 'http://localhost:8000/' : '';
console.log("The env is ", import.meta.env.DEV);
console.log("The host is ", HOST);
const ROUTE = 'api/';

export { HOST, ROUTE };

