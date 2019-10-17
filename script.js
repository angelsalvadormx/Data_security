var dictionary = ['&','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//var dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j(10)', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't(20)', 'u', 'v', 'w', 'x', 'y', 'z'];

var MyHash = {
  cont_loop: 0,
  encode: function (str, hash) {
    str = str.replace(' ','&'); 
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    hash = hash.toString().split('');
    var key = hash[0];
    var secretKey = Math.floor(Math.random() * (5 - 1)) + 1;
    
    var newStr = str.split('').map(function(e){
      return dictionary.findIndex(function(letter){
        return letter == e;
      });
    });

    var seed = 0;
    var valid = 0;

    newStr = newStr.map(num=>{
      seed = num * key * secretKey;
      valid = this.validSeed(seed);
      return dictionary[valid.seed]+valid.Nloop;
    });
    
    return (newStr.join(''))+secretKey+key
  },
  validSeed: function(seed){
    if(seed < 28){
      tmp = this.cont_loop;
      this.cont_loop = 0;
      return {seed,Nloop: tmp};
    }else{
      this.cont_loop++;
      return this.validSeed(seed-27);
    }
  },
  decode: function (str) {
    debugger;
    str = str.match(/.{1,2}/g);
    var hash = str.pop().split('');
    var key = hash.pop();
    var secretKey = hash.pop();
    secretKey *= key;
    str = str.map(function(item){
      item = item.split('');
      x = 27 * item.pop();
      letter = item.pop();
      
      found = dictionary.findIndex(function(e){
        return e == letter;
      })
      
      x += found;
      x = x / secretKey;
      
      return dictionary.find(function(element,i){
        return i == x
      })
    })
    return str.join('').replace('&',' ');
  }
};




var encode = MyHash.encode('nct', 2);
console.log('Encode ',encode);
console.log(dictionary);
var decode = MyHash.decode(encode);
//console.log('Decode ', decode);


