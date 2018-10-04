const config = require('./Config');
const AuthenticationModel = require('./AuthenticationModel');
const PNRModel = require('./PNRModel');
const PNRView = require('./PNRView');


function CreatePNR(accessToken) {
  const pnrCreator = new PNRModel({
    pcc: config.api.pcc,
    apiEndPoint: config.api.endpoint,
    apiAccessToken: accessToken,
  });

  pnrCreator.create().then(() => {
    const pnrViewer = new PNRView(pnrCreator);
    pnrViewer.render();
  });
}

function RunCreatePNR() {
  const authModel = new AuthenticationModel({
    apiEndPoint: config.api.endpoint,
    secret: config.api.secret,
  });

  authModel.readRequest().then(() => {
    CreatePNR(authModel.accessToken);
  });

  console.log('Welcome to the Create Passenger Name Record demo.\n');
}

RunCreatePNR();
