var shtml1 = '<script type="javsdasd"> 啊实打实的撒撒旦啊</script>'
var shtml2 = '<script> 啊实打实的撒撒旦啊</script>'
var shtml3 = '<script type="javsdasd"> 啊实打实的撒撒旦啊</script> <script type="javsdasd"> ddddd</script>'

var reg = /(<script.*>(.*?)<\/script>)+/i;
var reg1 = /<script[^>]*>(.*?)(?=<\/script>)<\/script>/ig;

// console.log(shtml3.replace(reg , '$1'));

var count = 0;
// shtml3.replace(reg1, function(matchs, p1 ,offset , allStr){
//     console.log(arguments)
// });

// var res = shtml3.replace(/<script[^>]*>/g , '').replace(/<\/script>/g,'');
// console.log(res);

var options = process.argv;
