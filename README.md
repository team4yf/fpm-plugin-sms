## FPM-PLUGIN-SMS
用于短信群发的插件

### Install
```bash
yarn add fpm-plugin-sms
```

## Basic Info
- Run Action Hook Name: `BEFORE_SERVER_START`
- ExtendModule Name: `sms`
- Exception
  - [x] `SMS`
    ```javascript
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
    ```
- `getDependencies()`
  - [x] `[]`
- The Reference Of The `Bind()` Method
  An BizModule Object Contains 1 Functions
  - [ ] `send`

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
  