# How-to: creazione app React Native (piattaforma target Android)

1. Seguire le istruzioni alla seguente pagina () fino alla voce "Configure the ANDROID_HOME environment variable" (inclusa).
2. Per creare la main directory dell'app, nel terminale dare il seguente comando: `npx react-native@latest init MiaApp` dove `MiaApp` è il nome che vogliamo dare al progetto.
3. Una volta terminato, muoversi nella cartella creata con `cd`
4. Per testare l'app abbiamo bisogno di un development server; React Native si porta dietro Metro, che possiamo avviare una volta nella cartella con il comando `npm start`
5. A questo punto, il welcome screen di Metro apparirà, e possiamo premere `a` per avviare l'app su un simulatore Android (vedi immagine d'esempio alla fine di questo HOWTO)
6. Se il simulatore non appare, vi è bisogno di avviarlo da Android Studio (questa operazione si può fare una sola volta, poi Metro dovrebbe avviarlo automaticamente)
7. Se non vogliamo usare Metro, nella cartella possiamo anche dare il comando `npm run android` per avviare direttamente l'app sul simulatore
8. L'entrypoint della app è rappresentato dal file `App.js`

*Avviare l'app sul simulatore* in realtà significa farne una build e deployarla sul simulatore; il deploy consiste, all'atto pratico, nell'istallazione del pacchetto della app.

![alt text](https://github.com/finalfire/mobprog-unisa/blob/main/react-native/howto.png?raw=true)