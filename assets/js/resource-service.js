class ResourceService
{
   
    baseUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ1ibA1o-Sh4vzmHc6pKD0Ss3WfFzIe-qvvSPmG4gca8gLutRYK_dY0EWjsANFgB-pSVm4FOX6RZbH/pub?output=csv&single=true&gid=`
    
    general = 1284108232;
    presidency = 0;
    presidencyAssignments = 1193891930;
    highCouncil = 1327477659;
    highCouncilAssignments = 2000120215;
    organizations = 763076688;
    buildings = 156666937;
    wards = 1720792576;

    
    async getData(id)
    {
        const url = `${this.baseUrl}${id}`;
        const response = await fetch(url);

        return response.text();
    }

    async getGeneralInformation()
    {
        return this.getData(this.general);
    }

    async getPresidency()
    {
        return this.getData(this.presidency);
    }

    async getPresidencyAssignments()
    {
        return this.getData(this.presidencyAssignments);
    }

    async getHighCouncil()
    {
        return this.getData(this.highCouncil);
    }

    async getHighCouncilAssignments()
    {
        return this.getData(this.highCouncilAssignments);
    }

    async getBuildings()
    {
        return this.getData(this.buildings);
    }

    async getWards()
    {
        return this.getData(this.wards);
    }

    async getOrganizations()
    {
        return this.getData(this.organizations);
    }

}