import { StitchClient } from 'mongodb-stitch'
import env from './env'

export const client = new StitchClient(env.STITCH_ID)
export const db = client.service('mongodb', 'mongodb-atlas').db(env.STITCH_DB)
export const test = db.collection('test')