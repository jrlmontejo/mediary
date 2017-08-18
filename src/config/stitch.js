import { StitchClient } from 'mongodb-stitch'
import env from './env'

const stitchClient = new StitchClient(env.STITCH_ID)
const db = stitchClient.service('mongodb', 'mongodb-atlas').db(env.STITCH_DB)

export default db