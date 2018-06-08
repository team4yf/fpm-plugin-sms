var should = require("chai").should();
var YF = require("yf-fpm-client-js").default;

YF.init({appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999'});


describe('Function', function(){
  beforeEach(done => {
    done()
  })
  

  afterEach(done => {
    done()
  })

  it('Function A', function(done){
    var func = new YF.Func('sms.send');
    func.invoke({tpl_id: 39012, mobiles: '13770683580', tpl_value: {number: 11111}})
      .then(function(data){
        console.log(data)
        done();
      }).catch(function(err){
        done(err);
      })
  })
})
