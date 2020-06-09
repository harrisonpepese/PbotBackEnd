const AssistantV1 = require('ibm-watson/assistant/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

class IbmService {
  constructor () {
    this.intatiate()
  }

  intatiate () {
    this.assistant = new AssistantV1({
      version: '2020-04-01',
      authenticator: new IamAuthenticator({
        apikey: process.env.IBM_APIKEY
      }),
      url: process.env.IBM_URL
    })
  }

  async processMessage (text, wokspaceId) {
    return await this.assistant.message({
      workspaceId: process.env.IBM_WORKSPACE,
      input: { text }
    }).then(res => { return res.result })
      .catch(error => { throw error })
  }

  async getIntents () {
    return await this.assistant.listIntents({
      workspaceId: 'ebcdb5d0-8e56-4843-aa03-a9fad5635fae'
    }).then(res => { return res.result })
      .catch(error => { throw error })
  }
}
module.exports = IbmService
