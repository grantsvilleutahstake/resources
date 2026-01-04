class ResourceService {

    urls = {
        Versions:`https://docs.google.com/spreadsheets/d/e/2PACX-1vQVftOfID3yrlP8nTrNgXb-h5sxzwh7lm5A275ktecgevMl3A4rnYz2IaEXtZDizMgspG5elUH8HVFd/pub?output=csv`,
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
        YouthCamps:`https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ12RQSZuUViBmPcJ4gn1ho9fJ-13mFXAhjhuMWHa79sjEwvI0tCZEHd5QjKtLlDUCfYP5MixopAwL/pub?gid=994105212&single=true&output=csv`,
        BishopPPIs:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRjjKdb-46zJgMHNUqlyLPQb0DP0wVgvIS6VasIXkQb4vgnLpv9qT1ho6RTxi0Bk9SS5K2wTHlZar-H/pub?gid=1332917091&single=true&output=csv`,
        EldersPPIs:`https://docs.google.com/spreadsheets/d/e/2PACX-1vR0cNQQjHoQH4-NiQKII-Erth3qhmINb4pHHJ5ZXis4I-bnJQcHYBKaJFIRi0ODD_IoU4bWbgSjRRlk/pub?gid=101714891&single=true&output=csv`,
        HighCouncilAssignments:`https://docs.google.com/spreadsheets/d/e/2PACX-1vSZBfm-7GNFWteGQcZqKn0dFbd7wkuj3ffgALslQ71s8UWpHXC5il7D4g2r7s4w7o4RxBLS78wlwsmL/pub?gid=2000120215&single=true&output=csv`,
        Wards:`https://docs.google.com/spreadsheets/d/e/2PACX-1vRXnDUrHMji0m-MuGTukjsThqpb0Sz8xyAZWi9npEzRgXxYbGRjEpqja3PIHxQfCRl90MVR8huYABOH/pub?gid=1720792576&single=true&output=csv`,
        Welfare:`https://docs.google.com/spreadsheets/d/e/2PACX-1vTEWQtMCKDCVlKyyrfdUMd-DfTZplZvXTIuXIP7m7zsGo0bBYGjhqio2AY6W0lfMk9MZTVJNrQ-2G5x/pub?gid=1332917091&single=true&output=csv`
    }

    versions = null
    data = {}

    fetchUrl = async (key) => {
       
        const url = this.urls[key]
        const response = await fetch(url)

        const csv = await response.text()
        const data = Papa.parse(csv, { header: true, skipEmptyLines: true, dynamicTyping: true }).data

        return data
    }


    getVersions = async() => {
        const key = 'Versions'

        //see if we already pulled from session
        if(this.versions) return this.versions
            
        let versions = sessionStorage.getItem(key)

        // check if we need to pull from spreadsheet
        if(versions) {
            this.versions = JSON.parse(versions)
            return this.versions
        } 

        versions = await this.fetchUrl(key)
        
        this.versions = versions
        sessionStorage.setItem(key, JSON.stringify(versions))

        return this.versions
        
    }

    clearVersions = async() => {
        const key = 'Versions'
        sessionStorage.removeItem(key)
    }

    saveToLocal = (data, key) => {
        const body = {
            saveDate: Date.now(),
            data: data
        }

        localStorage.setItem(key, JSON.stringify(body))

    }

    loadLocal = async (key) => {

        try {
            const body = JSON.parse(localStorage.getItem(key))
            const currentTime = Date.now()

            // check if data needs to be refreshed
            const versions = await this.getVersions()
            const version = versions.find(version => version.Key == key)

            const versionDate = Date.parse(version.Date)
            if(versionDate > body.saveDate) {
                localStorage.removeItem(key)
            } else {
                this.data[key] = body.data
            }
        } catch (e) {
            console.log(e)
        }

    }


    getData = async (key) => {
        if (!this.data.hasOwnProperty(key)) {
            await this.loadLocal(key)
        }

        if (!this.data.hasOwnProperty(key)) {
            const data = await this.fetchUrl(key)
            this.data[key] = data;

            //cache the loaded data to localStorage
            this.saveToLocal(data, key)

        }
        return this.data[key]
    }

    getGeneralInformation = async () => {
        return await this.getData('General')
    }

    getCallings = async () => {
        return await this.getData('Callings')
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
        return await this.getData('Wards')
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