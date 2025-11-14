class ResourceService
{
   
    baseUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?output=csv&single=true&gid=`
    
    generalInfoId = 1284108232;
    callingsId = 0;
    presidencyAssignmentsId = 1193891930;
    highCouncilId = 1327477659;
    highCouncilAssignmentsId = 2000120215;
    organizationsId = 763076688;
    buildingsId = 156666937;
    wardsId = 1720792576;
    stakeConferenceId = 347409085;
    tableOfContentsId = 915886203;
    youthCampsId = 994105212;

    isLoading = [];
    data = [];


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    async getData(id)
    {
        // don't try to load data that is currently being loaded
        // while(this.isLoading[id]) this.sleep(200);

        if(!this.data[id])
        {
            // mark that endpoint is being loaded
            // this.isLoading[id] = true;

            const url = `${this.baseUrl}${id}`;
            const response = await fetch(url);

            const body = await response.text();

            this.data[id] = Papa.parse(body, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;

            // loading is done
            // this.isLoading = this.isLoading.filter(value => value !== id);
        }
        return this.data[id]
    }

    async getGeneralInformation()
    {
        return await this.getData(this.generalInfoId);
    }

    async getCallings()
    {
        return await this.getData(this.callingsId);
    }

    async getPresidencyAssignments()
    {
        return await this.getData(this.presidencyAssignmentsId);
    }

    async getHighCouncil()
    {
        return await this.getData(this.highCouncilId);
    }

    async getHighCouncilAssignments()
    {
        return await this.getData(this.highCouncilAssignmentsId);
    }

    async getBuildings()
    {
        return await this.getData(this.buildingsId);
    }

    async getWards()
    {
        return await this.getData(this.wardsId);
    }

    async getOrganizations()
    {
        return await this.getData(this.organizationsId);
    }

    async getStakeConference()
    {
        return await this.getData(this.stakeConferenceId);
    }

    async getTableOfContents()
    {
        return await this.getData(this.tableOfContentsId);
    }

    async getYouthCamps()
    {
        return await this.getData(this.youthCampsId);
    }

}