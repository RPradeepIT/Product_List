// const appEnvironment = String(process.env.APP_ENV).toLowerCase()
function getServerConfiguration() {
  return {
    APIDomain: 'https://localhost:44384',
  }
}
const serverConfig = getServerConfiguration()

export default { serverConfig }
