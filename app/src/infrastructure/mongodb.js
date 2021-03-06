const Settings = require('settings-sharelatex')
const { MongoClient, ObjectId } = require('mongodb')
const parseMongoUrl = require('parse-mongo-url')

if (
  typeof global.beforeEach === 'function' &&
  process.argv.join(' ').match(/unit/)
) {
  throw new Error(
    'It looks like unit tests are running, but you are connecting to Mongo. Missing a stub?'
  )
}

const clientPromise = MongoClient.connect(
  Settings.mongo.url,
  Settings.mongo.options
)

let setupDbPromise
async function waitForDb() {
  if (!setupDbPromise) {
    setupDbPromise = setupDb()
  }
  await setupDbPromise
}

const db = {}
async function setupDb() {
  const internalDb = (await clientPromise).db(
    // TODO(das7pad): remove after upgrading mongodb
    parseMongoUrl(Settings.mongo.url).dbName
  )

  db.contacts = internalDb.collection('contacts')
  db.deletedProjects = internalDb.collection('deletedProjects')
  db.deletedSubscriptions = internalDb.collection('deletedSubscriptions')
  db.deletedUsers = internalDb.collection('deletedUsers')
  db.docHistory = internalDb.collection('docHistory')
  db.docHistoryIndex = internalDb.collection('docHistoryIndex')
  db.docOps = internalDb.collection('docOps')
  db.docSnapshots = internalDb.collection('docSnapshots')
  db.docs = internalDb.collection('docs')
  db.githubSyncEntityVersions = internalDb.collection(
    'githubSyncEntityVersions'
  )
  db.githubSyncProjectStates = internalDb.collection('githubSyncProjectStates')
  db.githubSyncUserCredentials = internalDb.collection(
    'githubSyncUserCredentials'
  )
  db.institutions = internalDb.collection('institutions')
  db.messages = internalDb.collection('messages')
  db.migrations = internalDb.collection('migrations')
  db.notifications = internalDb.collection('notifications')
  db.oauthAccessTokens = internalDb.collection('oauthAccessTokens')
  db.oauthApplications = internalDb.collection('oauthApplications')
  db.oauthAuthorizationCodes = internalDb.collection('oauthAuthorizationCodes')
  db.projectHistoryFailures = internalDb.collection('projectHistoryFailures')
  db.projectHistoryLabels = internalDb.collection('projectHistoryLabels')
  db.projectHistoryMetaData = internalDb.collection('projectHistoryMetaData')
  db.projectHistorySyncState = internalDb.collection('projectHistorySyncState')
  db.projectInvites = internalDb.collection('projectInvites')
  db.projects = internalDb.collection('projects')
  db.publishers = internalDb.collection('publishers')
  db.rooms = internalDb.collection('rooms')
  db.samlCache = internalDb.collection('samlCache')
  db.samlLogs = internalDb.collection('samlLogs')
  db.spellingPreferences = internalDb.collection('spellingPreferences')
  db.subscriptions = internalDb.collection('subscriptions')
  db.systemmessages = internalDb.collection('systemmessages')
  db.tags = internalDb.collection('tags')
  db.teamInvites = internalDb.collection('teamInvites')
  db.templates = internalDb.collection('templates')
  db.tokens = internalDb.collection('tokens')
  db.users = internalDb.collection('users')
  db.userstubs = internalDb.collection('userstubs')
}

module.exports = {
  db,
  ObjectId,
  waitForDb
}
