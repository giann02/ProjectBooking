export function handleFetchGet(url, setData, setLoading, emptyAlert, failedAlert) {

    // Optional parameters are a loading setter and a error alert

    const abortController = new AbortController()

    if (setLoading) {
        setLoading(true)
    }

    fetch(url)
        .then((res) => {

            if (res.status === 200 || res.status === 202) {
                return res.json()

            } else if (res.status === 404) {

                if (emptyAlert) {

                    console.log("no se encontro nada")

                }

            } else {

                if (failedAlert) {

                    failedAlert

                }
            }

        })
        .catch((error) => console.log(error))
        .then((response) => {
            setData(response)
            if (setLoading) {
                setLoading(false)
            }
        })

    return () => abortController.abort()
}