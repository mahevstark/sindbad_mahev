const { urls } = require("./Api_urls");

async function doPost(body_data,url_plus) {

    // doConsole(" I request @ " + urls.API + url_plus);
    // doConsole(body_data);
    var {isError, data} = await fetch(urls.API + url_plus, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data),
    }).then((response) => response.json())
      .then((responseJson) => {
        return {isError:false,data:responseJson}
      }).catch((error) => {
        return {isError:true,data:{}}
      });
    return {isError,data};
  }

  module.exports.doPost = doPost;