/*
Digital,OverDrive,EBOOK,2017,4,3,"Shadow Scale: Seraphina Series, Book 2",Rachel Hartman,"Fantasy, Historical Fiction, Young Adult Fiction, Young Adult Literature","Random House, Inc.",2015

Physical,Horizon,VIDEODISC,2017,4,11,L.M. Montgomery's Anne of Green Gables [videorecording] / Breakthrough Entertainment ; produced in association with YTV ; produced with the assistance of Shaw Rocket Fund ; produced by Ross Leslie ; written by Susan Coyne ; directed by John Kent Harrison.,,"Shirley Anne Fictitious character Drama, Orphans Drama, Country life Drama, Prince Edward Island Drama, Made for TV movies, Fiction television programs, Historical television programs, Video recordings for the hearing impaired","PBS Distribution,",[2016]
*/


let str1 = 'Digital,OverDrive,EBOOK,2017,4,3,"Shadow Scale: Seraphina Series, Book 2",Rachel Hartman,"Fantasy, Historical Fiction, Young Adult Fiction, Young Adult Literature","Random House, Inc.",2015';

let str2 = `Physical,Horizon,VIDEODISC,2017,4,11,L.M. Montgomery's Anne of Green Gables [videorecording] / Breakthrough Entertainment ; produced in association with YTV ; produced with the assistance of Shaw Rocket Fund ; produced by Ross Leslie ; written by Susan Coyne ; directed by John Kent Harrison.,,"Shirley Anne Fictitious character Drama, Orphans Drama, Country life Drama, Prince Edward Island Drama, Made for TV movies, Fiction television programs, Historical television programs, Video recordings for the hearing impaired","PBS Distribution,",[2016]`;

let str3 = `Digital,Freegal,SONG,2017,4,1,Jelly Roll,Charles Mingus,,,`

let str4 = `Physical,Horizon,VIDEODISC,2017,4,7,Sesame Street. Elmo can do it / directed by Jim Martin ... and others ; written by Annie Evans ... and others.,,"Elmo Fictitious character Henson Juvenile films, Friendship Juvenile films, Television series, Childrens television programs, Puppet television programs, Educational television programs, Video recordings for the hearing impaired","Sesame Workshop,",[2015]`


//console.log(arr[arr.length - 1]);

function validateArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || arr[i] === " ") {
      console.log(arr[i])
      return false;
    }
  }
  return true;
}

let s1 = 'a,b,,c,d';

let arr = s1.split(',');
console.log(validateArr(arr));

// for ( let i = 0; i < arr.length; i++ ) {
//   let newArr = [];
//   if (arr[i][0] === `"`) {
//     console.log(` " detected on element: ${arr[i]}`)
//   }
//   if (arr[i][arr[i].length - 1] === `"`) {
//     console.log(` " detected on element: ${arr[i]}`);
//   }
//   //console.log(arr[i]);
// }