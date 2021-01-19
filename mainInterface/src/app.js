const app = express();
app.use(cors({ credentials: true, origin: config.origin }));
app.use(cookieParser());
app.use(express.json());

module.exports = app;