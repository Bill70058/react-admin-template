/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 20:07:12
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-10-15 20:55:38
 * @FilePath: /react-admin-template/src/utils/devUtils.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function isObj(obj: any) {
  const str = typeof obj
  return str === 'object' || (str === 'function' && obj !== null)
}

// 深拷贝
export function deepCopy(obj: any, wekmap = new WeakMap()) {
  // symbol作为值直接返回一个新的symbol
  if (typeof obj === 'symbol') return Symbol(obj.description)
  if (typeof obj === 'function') return obj
  if (!isObj(obj)) return obj
  // 循环引用
  if (wekmap.has(obj)) return wekmap.get(obj)
  const newObj: any = Array.isArray(obj) ? [] : {}
  wekmap.set(obj, newObj)
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key], wekmap)
  }
  const symbolKeys = Object.getOwnPropertySymbols(obj)
  // symbol的值作为key
  for (const val of symbolKeys) {
    newObj[val] = deepCopy(obj[val], wekmap)
  }
  return newObj
}
