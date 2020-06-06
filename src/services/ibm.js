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
        apikey: 'iJNEAfV3kO5uZAcfWs8H_WC8otvTb9EXJBWc41_raGtp'
      }),
      url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/e998a46b-1138-4f51-a0a0-075aaf66a4ee'
    })
  }

  async processMessage (text, wokspaceId) {
    return await this.assistant.message({
      workspaceId: 'ebcdb5d0-8e56-4843-aa03-a9fad5635fae',
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
