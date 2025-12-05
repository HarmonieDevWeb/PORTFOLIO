import { MongoClient } from 'mongodb'

// URI de connexion MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/my-portfolio'

// Options de connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // En développement, utiliser une variable globale pour éviter
  // de créer trop de connexions lors du Hot Reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // En production, créer une nouvelle connexion
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Exporter la promesse de connexion
export default clientPromise
