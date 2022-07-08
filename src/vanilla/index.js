import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
    var lineLiffID = process.env.LIFF_ID

    console.log("liff id:", lineLiffID)

    liff
    .init({liffId: lineLiffID})
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
    })
    .catch((err) => {
        console.log('liff.init::', err)
    })
    
    liff.ready
    .then(() => {
        console.log("try liff.isLoggedIn")
        if (!liff.isLoggedIn()) {
            console.log("try liff.login()")
            liff.login()
        }

        console.log("try liff.getDecodedIDToken()")
        const idToken = liff.getDecodedIDToken()
        const now = new Date() / 1000
        if (idToken.exp < now) {
            liff.logout()
            liff.login()
        }

        console.log("try liff.getAccessToken()")
        if (liff.getAccessToken()) {
            const accessToken = liff.getAccessToken()
            console.log("try liff.getIDToken()")
            const idToken = liff.getIDToken()
            const regInfo = {
                id_token: idToken,
                access_token: accessToken,
            }
            console.log(regInfo)
        }
    })
    .catch(err => {
        console.log('startLiff::', err)
    })

    console.log("done")
});
