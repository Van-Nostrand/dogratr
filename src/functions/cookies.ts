export function getAllCookies () {
  return Object.fromEntries(document.cookie.split('; ').reduce((acc, cur) => {
    if (/=/.test(cur)) {
      acc.push(cur.split('='))
    }
    return acc
  }, []))
}

export function deleteCookie (key: string | Array<string>) {
  console.log('deleteCookie for key', key)
  if (Array.isArray(key)) {
    key.forEach((k) => {
      document.cookie = `${k}=;path=/;expires=${new Date(0).toUTCString()};`
    })
  } else {
    document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()};`
  }
}

export function getCookie (key: string) {
  document.cookie.split('; ').find((row) => row.startsWith(`${key}=`))?.split('=')[1]
}

type TsetCookieArgs = {
  name: string
  value: boolean | string | number
  options?: {
    path?: string
    expires?: Date
  }
}

// todo - type options
export function setCookie ({ name, value, options = {} }: TsetCookieArgs) {
  const path = options.path ?? '/'
  const expires = options.expires ?? new Date(new Date().setDate(new Date().getDate() + 30))
  document.cookie = `${name}=${value}; path=${path}; expires=${expires}; SameSite=Lax; Secure`
}
