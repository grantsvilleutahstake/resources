class ResourceService {

    urls = {
        Buildings:`https://docs.google.com/spreadsheets/d/e/2PACX-1vT1iT5Bbu7lCzM0dkPb6QUdmIdgff6PrFsEd7PQanB1VVCxaGyIlC24OOvTOqkCMjC6ztjv9n44VpaO/pub?gid=156666937&single=true&output=csv`,
        Callings:`https://docs.google.com/spreadsheets/d/e/2PACX-1vS9FzTQXNYIj838gubnNXyJvQ086V1nRoRsjzLbSMCAkeRYCCd2IKvYI80KUDDczEOYb8eAH5ifDEBq/pub?output=csv`,
        PresidencyAssignments:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRexTnEzD9BuIokJ3VXyKOUxY-h0cQKmRWVoMEFot5tIKzJMPYpKV_QdY6nBBM9vEVsZXxKch3IcYRP/pub?gid=1193891930&single=true&output=csv`,
        TOC:`https://docs.google.com/spreadsheets/d/e/2PACX-1vQBJuohpXLJgD5yMu2IS4ccSG6nk1b_dq0kLy106mOH9I__N0Nmi0wVERmJF9Ac3tzGjLDLEbM1JnUw/pub?gid=915886203&single=true&output=csv`,
        General:`https://docs.google.com/spreadsheets/d/e/2PACX-1vS-KODJLl_MYEIJ-rhpqnazV8Zp2088nmfcp-AMo6ulWwWitLgAigO_rgRi0FKtPQuaEr-m7Aakkkeq/pub?gid=1476742322&single=true&output=csv`,
        WardConferences:`https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk9v50j-ewt02iOjscPOzeyM9H4WC_Jh3-q77nxvjwomTb7PhJQWnweLAmlSEyV3v2xvmp7_o4nv8/pub?gid=0&single=true&output=csv`,
        Organizations:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRXoswdY80384PRJHEuCjrzJ0pUfSUymWvauESxl_6S-ziA318w_2AvKb3UG33xNiBhNUXRWYD-OfaL/pub?gid=1589061574&single=true&output=csv`,
        SpeakingTopics:`https://docs.google.com/spreadsheets/d/e/2PACX-1vShLSfq9v59X45wZjG1uJ4oCvGCw0wBONGY-f1w9R9jxHOkYZGnYIGgeAwsEahwIPI3FGkEFDDSXndn/pub?gid=1693155233&single=true&output=csv`,
        SpeakingAssignments:`https://docs.google.com/spreadsheets/d/e/2PACX-1vShLSfq9v59X45wZjG1uJ4oCvGCw0wBONGY-f1w9R9jxHOkYZGnYIGgeAwsEahwIPI3FGkEFDDSXndn/pub?gid=1229035460&single=true&output=csv`,
        StakeConferences:`https://docs.google.com/spreadsheets/d/e/2PACX-1vQFkx1KymZlZh8Wd2fGE8HmuVfGvxKA1d27U6GXIkvnNI_UG_sxqM41Yf7ajxwp-8IR_HuOqDwtBhMn/pub?gid=347409085&single=true&output=csv`,
        StakeConferenceProgram: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQpQ9BcNzg0ccGvpHScbvqo71ByQoQIJAHtNwsubWTU9_3gSH4WeiaLjbEDjIdLQ8eONl-PPSW4IMa2/pub?output=csv`,
        YouthCamps:`https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ12RQSZuUViBmPcJ4gn1ho9fJ-13mFXAhjhuMWHa79sjEwvI0tCZEHd5QjKtLlDUCfYP5MixopAwL/pub?gid=994105212&single=true&output=csv`,
        BishopPPIs:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRjjKdb-46zJgMHNUqlyLPQb0DP0wVgvIS6VasIXkQb4vgnLpv9qT1ho6RTxi0Bk9SS5K2wTHlZar-H/pub?gid=1332917091&single=true&output=csv`,
        EldersPPIs:`https://docs.google.com/spreadsheets/d/e/2PACX-1vR0cNQQjHoQH4-NiQKII-Erth3qhmINb4pHHJ5ZXis4I-bnJQcHYBKaJFIRi0ODD_IoU4bWbgSjRRlk/pub?gid=101714891&single=true&output=csv`,
        HighCouncilAssignments:`https://docs.google.com/spreadsheets/d/e/2PACX-1vSZBfm-7GNFWteGQcZqKn0dFbd7wkuj3ffgALslQ71s8UWpHXC5il7D4g2r7s4w7o4RxBLS78wlwsmL/pub?gid=2000120215&single=true&output=csv`,
        Wards:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRXnDUrHMji0m-MuGTukjsThqpb0Sz8xyAZWi9npEzRgXxYbGRjEpqja3PIHxQfCRl90MVR8huYABOH/pub?gid=1720792576&single=true&output=csv`,
        Welfare:`https://docs.google.com/spreadsheets/d/e/2PACX-1vTEWQtMCKDCVlKyyrfdUMd-DfTZplZvXTIuXIP7m7zsGo0bBYGjhqio2AY6W0lfMk9MZTVJNrQ-2G5x/pub?gid=1332917091&single=true&output=csv`
    }

    // key -> promise of the sheet's rows, so a sheet is requested once per page
    // load even when several callers ask for it at the same time
    data = {}

    /**
     * Pages with no "Refresh Data" control opt out of the browser caches so a
     * reload always shows what is in the spreadsheets. Set by the layout - see
     * _layouts/stake-conference-home.html. The in-memory `data` cache still
     * applies, so a sheet is fetched once per page load, not once per lookup.
     */
    cacheEnabled = window.resourceCacheEnabled !== false

    fetchUrl = async (key) => {

        const url = this.urls[key]
        const response = await fetch(url)

        // never parse (and cache) an error page as if it were the sheet
        if (!response.ok) throw new Error(`${key}: ${response.status} ${response.statusText}`)

        const csv = await response.text()
        const data = Papa.parse(csv, { header: true, skipEmptyLines: true, dynamicTyping: true }).data

        return data
    }

    clearCache = async() => {
        localStorage.clear()
        sessionStorage.clear()
    }

    saveToLocal = (data, key) => {
        const body = {
            saveDate: Date.now(),
            data: data
        }

        try {
            localStorage.setItem(key, JSON.stringify(body))
        } catch (e) {
            console.log(e)
        }

    }

    loadLocal = (key) => {

        try {
            const body = JSON.parse(localStorage.getItem(key))
            return body ? body.data : null
        } catch (e) {
            console.log(e)
            return null
        }

    }

    /**
     * Stale-while-revalidate: if the sheet is cached, return the cached rows
     * immediately and fetch the sheet in the background. When the sheet has
     * changed the cache is updated, so the next page view shows the new data,
     * and a `resource-data-changed` event (detail = sheet key) is fired on
     * `document` for pages that want to re-render straight away.
     */
    loadData = async (key) => {
        const cached = this.cacheEnabled ? this.loadLocal(key) : null

        const fresh = this.fetchUrl(key).then(data => {
            if (this.cacheEnabled) this.saveToLocal(data, key)
            return data
        })

        if (!cached) return fresh

        fresh.then(data => {
            if (JSON.stringify(data) === JSON.stringify(cached)) return

            this.data[key] = Promise.resolve(data)
            document.dispatchEvent(new CustomEvent('resource-data-changed', { detail: key }))
        }).catch(e => console.log(e)) // offline or Google is down - keep showing the cache

        return cached
    }

    getData = (key) => {
        if (!this.data.hasOwnProperty(key)) {
            this.data[key] = this.loadData(key)

            // don't keep a failed request around - let the next caller try again
            this.data[key].catch(() => delete this.data[key])
        }
        return this.data[key]
    }

    getGeneralInformation = async () => {
        return await this.getData('General')
    }    

    getRow = async (section, key) => 
    {
        const generalInfo = await this.getGeneralInformation();

        const row = generalInfo.find(info => info.Section === section && info.Key === key);

        return row;
    }
    
    getBaseUrl = async () =>
    {
        const row = await this.getRow('Global','Base Url')

        if(!row) return '';

        return row.Value
    }

    getCallings = async () => {
        const baseUrl = await this.getBaseUrl()
        const callings =  await this.getData('Callings')

        const people = callings.map(calling => {
            const person =  {
                ...calling,
                Profile: `${baseUrl}${calling.Profile}`
            }
            return person
        })

        return people
    }

    getPresidencyAssignments = async () => {
        return await this.getData('PresidencyAssignments')
    }

    getHighCouncil = async () => {
        const callings =  await this.getCallings()

        return callings.filter(calling => calling.OrganizationId == 2)
    }

    getHighCouncilAssignments = async () => {
        return await this.getData('HighCouncilAssignments')
    }

    getBuildings = async () => {
        return await this.getData('Buildings')
    }

    getWards = async () => {
        const baseUrl = await this.getBaseUrl()
        const wards = await this.getData('Wards')

        const people = wards.map(ward => {
            const person =  {
                ...ward,
                BishopProfile: `${baseUrl}${ward.BishopProfile}`
            }
            return person
        })

        return people
    }

    getWardConferences = async () => {
        let meetings = await this.getData('WardConferences')
        meetings = meetings.map(meeting => {
            const newDate = parseDate(meeting.Date)
            const month = newDate.toLocaleDateString('en-US', { month: 'long' })
            const day = newDate.getDate()

            return {
                ...meeting,
                Date: newDate,
                Month: month,
                Day: day
            }
        })

        return meetings
    }

    getOrganizations = async () => {
        return await this.getData('Organizations')
    }

    getStakeConference = async () => {
        return await this.getData('StakeConferences')
    }

    getStakeConferenceProgram = async () => {
        return await this.getData('StakeConferenceProgram')
    }

    getBishopPPIs = async () => {
        return await this.getData('BishopPPIs')
    }

    getEldersPPIs = async () => {
        return await this.getData('EldersPPIs')
    }

    getTableOfContents = async () => {
        return await this.getData('TOC')
    }

    getSpeakingTopics = async () => {
        return await this.getData('SpeakingTopics')
    }

    getSpeakingAssignments = async () => {
        return await this.getData('SpeakingAssignments')
    }

    getYouthCamps = async () => {
        return await this.getData('YouthCamps')
    }

    getWelfare = async () => {
        return await this.getData('Welfare')
    }

}