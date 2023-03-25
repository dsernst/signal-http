import { execSync } from 'child_process'

try {
  execSync('rm ./hs_err_pid*.log') // Clean up old logs
} catch (error) {}
