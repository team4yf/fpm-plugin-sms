import _ from 'lodash'
import axios from 'axios'

export default {
  bind: (fpm) => {

    fpm.registerAction('BEFORE_SERVER_START', () => {
      const c = fpm.getConfig()
      let juheSmsOptions = _.assign({
        "appkey": "111",
        }, c.juheSms || {})
      const APPKEY = juheSmsOptions.appkey
      console.log(APPKEY)
      fpm.extendModule('sms', {
        send: async args => {
          let tpl_id = args.tpl_id || false
          let tpl_value = args.tpl_value || {}
          let mobiles = args.mobiles
          tpl_value = _.map(tpl_value, (v, k)=>{
            return '#' + k + '#=' + v
          }).join('&')
          tpl_value = encodeURIComponent(tpl_value)
          let body = _.map({
              tpl_id: tpl_id,
              key: APPKEY,
              mobile: mobiles,
              tpl_value: tpl_value
            }, (v, k)=>{
              return k + '=' + v
            }).join('&')
          try{
            let result = await axios.get('http://v.juhe.cn/sms/send?' + body)
            result = result.data
            if(result.error_code === 0){
              return Promise.resolve({data: result.result})
            }else{
              return Promise.reject({errno: error_code, message: result.reason})
            }
          }catch(e){
            return Promise.reject({ errno: -10020, error: e})
          }
        }
      })
    })

  }
}
