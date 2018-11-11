// 返回随机数
export const randomNum = (minNum, maxNum, float) => {
  let ranNum;
  if (float) {
    ranNum = (minNum + Math.random()).toFixed(2)
    if (ranNum > maxNum) {
      ranNum = maxNum
    }
  } else {
    ranNum = parseInt(Math.random() * (maxNum - minNum + 1) + minNum)
  }
  return ranNum
}
// 返回随机颜色
export const randomColor = (opacity = 0) => {
  return `rgba(
      ${randomNum(0, 255)},
      ${randomNum(0, 255)},
      ${randomNum(0, 255)},
      ${opacity || randomNum(0.4, 0.8, true)}
    )`
}

// 设置导航列表
export const setTagsInSessionStorage = list => {
  sessionStorage.setItem('tags', JSON.stringify(list))
}
// 获取导航列表
export const getTagsFormSessionStorage = () => {
  return new Promise(resolve => {
    const list = sessionStorage.getItem('tags')
    list ? resolve(JSON.parse(list)) : resolve(false)
  })
}
// 设置导航状态
export const setSideStateLocal = state => {
  localStorage.sideState = state
}
// 获取导航状态
export const getSideStateLocal = () => {
  const sideState = localStorage.sideState
  return sideState === 'false' ? false : true
}
