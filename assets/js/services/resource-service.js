class ResourceService {

    baseUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?output=csv&single=true&gid=`

    urlCallings = `https://docs.google.com/spreadsheets/d/e/2PACX-1vS9FzTQXNYIj838gubnNXyJvQ086V1nRoRsjzLbSMCAkeRYCCd2IKvYI80KUDDczEOYb8eAH5ifDEBq/pub?output=csv`
    urlTOC = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQBJuohpXLJgD5yMu2IS4ccSG6nk1b_dq0kLy106mOH9I__N0Nmi0wVERmJF9Ac3tzGjLDLEbM1JnUw/pub?gid=915886203&single=true&output=csv`
    urlGeneral = `https://docs.google.com/spreadsheets/d/e/2PACX-1vS-KODJLl_MYEIJ-rhpqnazV8Zp2088nmfcp-AMo6ulWwWitLgAigO_rgRi0FKtPQuaEr-m7Aakkkeq/pub?gid=1476742322&single=true&output=csv`

    //urlGeneral = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?gid=1284108232&single=true&output=csv`
    urlWardConferences = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk9v50j-ewt02iOjscPOzeyM9H4WC_Jh3-q77nxvjwomTb7PhJQWnweLAmlSEyV3v2xvmp7_o4nv8/pub?gid=0&single=true&output=csv`
    urlOrganizations = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRXoswdY80384PRJHEuCjrzJ0pUfSUymWvauESxl_6S-ziA318w_2AvKb3UG33xNiBhNUXRWYD-OfaL/pub?gid=1589061574&single=true&output=csv`
    urlSpeakingTopics = `https://docs.google.com/spreadsheets/d/e/2PACX-1vShLSfq9v59X45wZjG1uJ4oCvGCw0wBONGY-f1w9R9jxHOkYZGnYIGgeAwsEahwIPI3FGkEFDDSXndn/pub?gid=1693155233&single=true&output=csv`
    urlSpeakingAssignments = `https://docs.google.com/spreadsheets/d/e/2PACX-1vShLSfq9v59X45wZjG1uJ4oCvGCw0wBONGY-f1w9R9jxHOkYZGnYIGgeAwsEahwIPI3FGkEFDDSXndn/pub?gid=1229035460&single=true&output=csv`
    urlYouthCamps = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ12RQSZuUViBmPcJ4gn1ho9fJ-13mFXAhjhuMWHa79sjEwvI0tCZEHd5QjKtLlDUCfYP5MixopAwL/pub?gid=994105212&single=true&output=csv`

    urlEldersPPIs = `https://docs.google.com/spreadsheets/d/e/2PACX-1vR0cNQQjHoQH4-NiQKII-Erth3qhmINb4pHHJ5ZXis4I-bnJQcHYBKaJFIRi0ODD_IoU4bWbgSjRRlk/pub?gid=101714891&single=true&output=csv`

    presidencyAssignmentsId = 1193891930
    highCouncilId = 1327477659
    highCouncilAssignmentsId = 2000120215
    buildingsId = 156666937
    wardsId = 1720792576
    stakeConferenceId = 347409085
    bishopPPIsId = 1332917091

    data = {}

    constructor() {
        this.loadFromLocal()
    }

    saveToLocal = (data) => {
        const days = 30
        const hours = 24
        const minutes = 60
        const seconds = 60
        const miliseconds = 1000

        const newTime = Date.now() + (days * hours * minutes * seconds * miliseconds)

        const body = {
            newTime: newTime,
            data: data
        }

        localStorage.setItem('resource-guide', JSON.stringify(body))

    }

    loadFromLocal = async () => {

        try {
            const body = JSON.parse(localStorage.getItem('resource-guide'))
            const currentTime = Date.now()

            if(body.newTime < currentTime) {
                localStorage.removeItem('resource-guide')
            } 
            else {
                this.data = body.data
            }
        } catch(e) {
            console.log(e)            
        }

    }


    getData = async (id) => {

        if(!this.data.hasOwnProperty(id)) {

            const url = `${this.baseUrl}${id}`
            const response = await fetch(url)

            const body = await response.text()

            const data = Papa.parse(body, { header: true, skipEmptyLines: true, dynamicTyping: true }).data

            this.data[id] = data;
            //cache the loaded data to localStorage
            this.saveToLocal(this.data)
        }
        return this.data[id]
    }

    getDataFromURL = async (url) => {

        if(!this.data.hasOwnProperty(url)) {
            const response = await fetch(url)

            const body = await response.text()

            const data = Papa.parse(body, { header: true, skipEmptyLines: true, dynamicTyping: true }).data
            
            this.data[url] = data;
            //cache the loaded data to localStorage
            this.saveToLocal(this.data)
        }
        return this.data[url]
    }

    getGeneralInformation = async () => {
        return await this.getDataFromURL(this.urlGeneral)
    }

    getCallings = async () => {
        return await this.getDataFromURL(this.urlCallings)
    }

    getPresidencyAssignments = async () => {
        return await this.getData(this.presidencyAssignmentsId)
    }

    getHighCouncil = async () => {
        return await this.getData(this.highCouncilId)
    }

    getHighCouncilAssignments = async () => {
        return await this.getData(this.highCouncilAssignmentsId)
    }

    getBuildings = async () => {
        return await this.getData(this.buildingsId)
    }

    getWards = async () => {
        return await this.getData(this.wardsId)
    }

    getWardConferences = async () => {
        let meetings = await this.getDataFromURL(this.urlWardConferences)
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
        return await this.getDataFromURL(this.urlOrganizations)
    }

    getStakeConference = async () => {
        return await this.getData(this.stakeConferenceId)
    }

    getBishopPPIs = async () => {
        return await this.getData(this.bishopPPIsId)
    }

    getEldersPPIs = async () => {
        return await this.getDataFromURL(this.urlEldersPPIs)
    }

    getTableOfContents = async () => {
        return await this.getDataFromURL(this.urlTOC)
    }

    getSpeakingTopics = async () => {
        return await this.getDataFromURL(this.urlSpeakingTopics)
    }

    getSpeakingAssignments = async () => {
        return await this.getDataFromURL(this.urlSpeakingAssignments)
    }

    getYouthCamps = async () => {
        return await this.getData(this.urlYouthCamps)
    }

}