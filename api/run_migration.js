/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { exec } = require('child_process')

// Ejecuta el comando de migración
exec('npm run typeorm migration:run', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error durante la migración: ${error.message}`)
    process.exit(1) // Retorna un código de error
  }

  // Verifica si se encontró un "query: ROLLBACK" en la salida stderr
  if (stderr.includes('query: ROLLBACK')) {
    console.error('La migración terminó con un rollback')
    console.error(stderr)
    process.exit(1) // Retorna un código de error
  }
  if (stdout.includes('query: ROLLBACK')) {
    console.error('La migración terminó con un rollback')
    console.error(stdout)
    process.exit(1) // Retorna un código de error
  } else {
    console.log(stdout)
    console.log('La migración se completó con éxito')
  }
})
