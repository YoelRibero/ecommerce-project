export default class API {
  async getData(localList) {
    const cacheList = window.localStorage.getItem(localList)
    if (cacheList) {
      console.log('hola')
      return JSON.parse(cacheList);
    }
    const url = `${window.location.href}db.json`
    const response = await fetch(url)
    const data = await response.json()
    window.localStorage.setItem(localList, JSON.stringify(data));
    return data
  }
}