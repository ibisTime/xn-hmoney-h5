export function setCookie(name, value, expires) {
  var expr = '';
  if (!expires) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    expr = ';expires=' + exp.toGMTString();
  }
  document.cookie = name + '=' + escape(value) + expr + ';path=/;';
}

export function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  var arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/;';
  }
}

export default {
  setLang(lang) {
    window.localStorage.setItem('user_lang', lang);
  },
  getLang(defaultLang) {
    let localLang = window.localStorage.getItem('user_lang');
    if (localLang === null) {
      return defaultLang;
    } else {
      return localLang;
    }
  }
};