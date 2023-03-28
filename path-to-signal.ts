// Export shared path to signal-cli
import { join } from 'path'

export const signal = join(__dirname + '/../node_modules/.bin/signal-cli') + ' --config ./cli-config'
