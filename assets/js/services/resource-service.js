class ResourceService
{
   
    baseUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?output=csv&single=true&gid=`
    
    urlCallings =     `https://docs.google.com/spreadsheets/d/e/2PACX-1vS9FzTQXNYIj838gubnNXyJvQ086V1nRoRsjzLbSMCAkeRYCCd2IKvYI80KUDDczEOYb8eAH5ifDEBq/pub?output=csv`
    urlTOC = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQBJuohpXLJgD5yMu2IS4ccSG6nk1b_dq0kLy106mOH9I__N0Nmi0wVERmJF9Ac3tzGjLDLEbM1JnUw/pub?gid=915886203&single=true&output=csv`
    urlGeneral = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?gid=1284108232&single=true&output=csv`
    urlWardConferences = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk9v50j-ewt02iOjscPOzeyM9H4WC_Jh3-q77nxvjwomTb7PhJQWnweLAmlSEyV3v2xvmp7_o4nv8/pub?gid=0&single=true&output=csv`

    presidencyAssignmentsId = 1193891930
    highCouncilId = 1327477659
    highCouncilAssignmentsId = 2000120215
    organizationsId = 763076688
    buildingsId = 156666937
    wardsId = 1720792576
    stakeConferenceId = 347409085
    youthCampsId = 994105212
    bishopPPIsId = 1332917091

    isLoading = []
    data = []

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    
    async getData(id)
    {
        // don't try to load data that is currently being loaded
        // while(this.isLoading[id]) this.sleep(200)

        if(!this.data[id])
        {
            // mark that endpoint is being loaded
            // this.isLoading[id] = true

            const url = `${this.baseUrl}${id}`
            const response = await fetch(url)

            const body = await response.text()

            this.data[id] = Papa.parse(body, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data

            // loading is done
            // this.isLoading = this.isLoading.filter(value => value !== id)
        }
        return this.data[id]
    }

    async getDataFromURL(url)
    {
        // don't try to load data that is currently being loaded
        // while(this.isLoading[id]) this.sleep(200)

        if(!this.data[url])
        {
            const response = await fetch(url)

            const body = await response.text()

            this.data[url] = Papa.parse(body, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data

        }
        return this.data[url]
    }

    async getGeneralInformation()
    {
        return await this.getDataFromURL(this.urlGeneral)
    }

    async getCallings()
    {
        return await this.getDataFromURL(this.urlCallings)
    }

    async getPresidencyAssignments()
    {
        return await this.getData(this.presidencyAssignmentsId)
    }

    async getHighCouncil()
    {
        return await this.getData(this.highCouncilId)
    }

    async getHighCouncilAssignments()
    {
        return await this.getData(this.highCouncilAssignmentsId)
    }

    async getBuildings()
    {
        return await this.getData(this.buildingsId)
    }

    async getWards()
    {
        return await this.getData(this.wardsId)
    }

    async getWardConferences()
    {
        let meetings = await this.getDataFromURL(this.urlWardConferences)
        meetings = meetings.map( meeting => {
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

    async getOrganizations()
    {
        return await this.getData(this.organizationsId)
    }

    async getStakeConference()
    {
        return await this.getData(this.stakeConferenceId)
    }

    async getBishopPPIs()
    {
        return await this.getData(this.bishopPPIsId)
    }

    async getTableOfContents()
    {
        return await this.getDataFromURL(this.urlTOC)
    }

    async getYouthCamps()
    {
        return await this.getData(this.youthCampsId)
    }

}