
async function getDefaultUser() {
    const res = await fetch("http://localhost:8080/api/v1/user/default",
        { method: "GET" });
    const user = await res.json();
    return {name: user.name, score: user.scores[user.scores.length - 1].Amount};
}

async function patchDefaultUserScore(score) {
    console.log("patch" + score)
    const res = await fetch("http://localhost:8080/api/v1/user/default",
        {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "score": score
            }),
        })
    const user = await res.json()
    return {name: user.name, score: user.scores[user.scores.length - 1].Amount};
}

export {getDefaultUser, patchDefaultUserScore};

