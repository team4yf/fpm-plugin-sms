import _ from 'lodash'
import axios from 'axios'

const E = {
  SMS: {
    SEND_ERROR: {
      errno: -10011, 
      code: 'SEND_ERROR', 
      message: 'the sms server refused the send request'
    },
    OPERATE_ERROR: {
      errno: -10012, 
      code: 'OPERATE_ERROR', 
      message: 'the sms server refused the send request'
    }
  }
}

export default {
  bind: (fpm) => {
    const juheSmsOptions = fpm.getConfig('juheSms', {
      "appkey": "111",
      })
    const APPKEY = juheSmsOptions.appkey

    const bizModule = {
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
            return Promise.reject(_.assign( E.SMS.SEND_ERROR, { message: result.error_code + ';' + result.reason }))
          }
        }catch(e){
          return Promise.reject( E.SMS.OPERATE_ERROR )
        }
      }
    }

    fpm.registerAction('BEFORE_SERVER_START', () => {

      fpm.extendModule('sms', bizModule)
    })

    return bizModule

  }
}
