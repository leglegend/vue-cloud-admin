import { Message } from 'element-ui'

export default function ({ url, data }) {
  let urls = url.split('/')
  console.log(urls)

  return new Promise((resolve, reject) => {
    uniCloud
      .callFunction({
        name: urls[1],
        data: {
          method: urls[2],
          data
        }
      })
      .then(({ result }) => {
        if (result.status === 200) {
          resolve(result.data)
        } else {
          Message({
            message: result.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(result)
        }
      })
  })
}
