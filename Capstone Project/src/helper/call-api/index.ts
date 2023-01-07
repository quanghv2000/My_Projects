export async function callApi(url: string, configObj: any) {
  const originObj = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const response = await fetch(url, Object.assign(originObj, configObj))
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      return err;
    });
  return response.json();
}

