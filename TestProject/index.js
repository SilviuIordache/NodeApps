let max = 10;

let x =  Math.floor(Math.random() * Math.floor(max));

//console.log(x);

for (let i = 0; i < 10; i++) {
  waitTime = Math.floor(Math.random() * Math.floor(max));

  console.log(`Waiting for ${waitTime} s`);

  var prom = new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log(i);
    }, waitTime * 1000);
  });

}