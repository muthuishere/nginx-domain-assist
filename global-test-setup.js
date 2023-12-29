import 'dotenv/config'
// import {initKubeConfig} from "./src/kubernetes/k8config.js";
console.log("global-test-setup.js")




export async function mochaGlobalSetup() {
    console.log("init stuff")
    // await initKubeConfig(process.env.KUBERNETES_CONFIG_FILE)
}
