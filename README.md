## FPM-PLUGIN-SMS
用于短信群发的插件

### Install
```bash
yarn add fpm-plugin-sms
```

### Useage

- Set option in `config.json` Of your project

  ```json
  {
    //...
    "juheSms": {
        "appkey": "********************"
    }
  }
  ```

- Call The Function `sms.send`
  ```javascript
  {
      tpl_id: 39012, // The template Id In Juhe.CN  you can set it At  [https://www.juhe.cn/sms](https://www.juhe.cn/sms)
      mobiles: '13770683580',   // The Phone Numbers
      tpl_value: {number: 11111}    // The Content Of The Message
  }
  ```
  