export default function({ $axios, store, req, redirect, $fire }) {
    if (req) {
      let cookies = JSON.parse(getCookie('dindin-cookies', req.headers.cookie))
      if (cookies) {
        $axios.defaults.headers.common[
          'Authorization'
        ] = `${cookies.login.token}`
      }
    }
  
    $axios.onRequest(config => {
      if (!req)
        config.headers.common['Authorization'] = `${store.getters['login/token']}`
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 403) {
        try {
          $fire.auth.signOut()
        } catch(e) {}
        
        redirect('/login')
        store.dispatch('login/userLogout', {
          router: null
        })
      }
      // Tratamento de Erro
    })
  }
  
  function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)
    if (strCookie == null) return null
    else
      return unescape(
        strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : ''
      )
  }
  