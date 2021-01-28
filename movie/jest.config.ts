// jest.config.ts
import type { Config } from "@jest/types"

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
}
export default config
