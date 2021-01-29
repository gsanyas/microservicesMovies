const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

module.exports = app
