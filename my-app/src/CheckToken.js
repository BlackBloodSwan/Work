import API from "./Api";

async function checkToken(token) {
    let returnValue = {}
    try {
        const response = await API.requestToken(token)
        // check if email exist in array
        const array = [
                "schimmerd@mediamarktsaturn.com",
                "seitzf@mediamarktsaturn.com",
                "raudizs@mediamarktsaturn.com",
                "handschuhj@mediamarktsaturn.com",
                "hoke@mediamarktsaturn.com",
                "gerstmeyer@mediamarktsaturn.com",
                "goppold@mediamarktsaturn.com",
                "schallado@mediamarktsaturn.de",

        ]
        if (array.indexOf(response.data.email) > -1 ) {
            localStorage.setItem("token", token)
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("user_profile", JSON.stringify({
                "status": 200,
                "profile": {
                    "email": response.data.email,
                    "email_verified": response.data.email_verified,
                    "expires_in": response.data.exp,
                    "family_name": response.data.family_name,
                    "given_name": response.data.given_name,
                    "name": response.data.name,
                    "picture": response.data.picture,
                    "locale": response.data.locale,
                    "domain": response.data.hd
                }
            }))
            returnValue = { "status": 200, "desc": "Ok: Token still valid" }
        } else {
            returnValue = { "status": 401, "desc": "Unauthorized" }
        }
        return returnValue

    } catch (e) {
        return { "status": 400, "error": "Invalid value or token expired", "desc": e }
    }
}

export default checkToken