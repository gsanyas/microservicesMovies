const app = express();
app.use(cors({ origin: config.origin }));
app.use(express.json());

module.exports = app;
