let apiURL

const apiURLs = {
    production: "https://woofus-gpt.onrender.com",
    development: "http://localhost:3001"
}

if (window.location.hostname === "localhost") {
    apiURL = apiURLs.development
} else {
    apiURL = apiURLs.production
}

export default apiURL