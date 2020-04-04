const http = require("http");

const data = JSON.stringify({
  strategy: "local",
  email: "hello@feathersjs.com",
  password: "supersecret",
});

const options = {
  hostname: "localhost",
  port: 3030,
  path: "/authentication",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
