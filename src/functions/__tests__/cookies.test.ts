import * as cookies from '../cookies'

describe('functions / cookies', () => {
  let originalDoc: any
  let originalDate: any

  beforeAll(() => {
    originalDoc = global.document
    originalDate = global.Date
  })

  beforeEach(() => {
    function mockDate () {
      this.setDate = function () {
        return 'setDate'
      }
      this.getDate = function () {
        return 'getDate'
      }

      this.toUTCString = function () {
        return 'toUTCString'
      }
    }

    const mockDoc = {
      cookie: {
        value_: '',

        get cookie () {
          return this.value_
        },

        set cookie (val) {
          this.value_ = `${this.value_}; ${val}`
        }
      }
    }

    // @ts-ignore
    global.document = mockDoc
    // @ts-ignore
    global.Date = mockDate
  })

  afterAll(() => {
    global.document = originalDoc
    global.Date = originalDate
  })

  test('setCookie', () => {
    cookies.setCookie({ name: 'bob', value: 'something' })

    expect(document.cookie).toEqual('bob=something; path=/; expires=[object Object]; SameSite=Lax; Secure')
  })

  test('deleteCookie', () => {
    cookies.setCookie({ name: 'bob', value: 'something' })
    cookies.deleteCookie('bob')

    expect(document.cookie).toEqual('bob=;path=/;expires=toUTCString;')
  })
})
