import { IErrorRespone } from 'models/base';

export * from './info-modal-dialog';
export * from './validation';

export function actionPayload<T = any>(payload: T) {
  return { payload };
}

export function errorRespone(errorRes: any): IErrorRespone {
  const { data, status, statusText } = errorRes?.response;

  return { data, status, statusText };
}

export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  //"app=article&act=news_content&aid=160990"
  var vars = query.split('&');
  //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return '';
}
