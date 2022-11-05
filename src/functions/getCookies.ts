export default function getCookies () {
  return Object.fromEntries(document.cookie.split('; ').reduce((acc, cur) => {
    if (/=/.test(cur)) {
      acc.push(cur.split('='))
    }
    return acc
  }, []))
}
