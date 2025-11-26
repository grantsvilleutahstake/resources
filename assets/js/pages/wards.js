let wardsFilter
let bishopDropdown
let buildingDropdown
let highCouncilDropdown
let yearDropdown

document.addEventListener('DOMContentLoaded', async () => {

    await service.getBuildings()
    await service.getBuildings()

    yearDropdown = new YearDropdown()
    highCouncilDropdown = new HighCouncilDropdown()
    buildingDropdown = new BuildingDropdown()
    bishopDropdown = new BishopDropdown()
    wardsFilter = new WardsFilter()

})

class WardsFilter {

    selectedWardId = 'All'
    selectedHighCouncilId = 0
    selectedBuildingId = 0
    selectedYear = 0

    constructor() {
        this.selectedYear = new Date().getFullYear()
        this.displayYear()
        this.displayBuildings()

        yearDropdown.onSelectionChanged(this.selectedYearChanged)
        buildingDropdown.onSelectionChanged(this.selectedBuildingChanged)
        bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
        highCouncilDropdown.onSelectionChanged(this.selectedHighCouncilorChanged)
    }

    selectedYearChanged = (year) => {        
        this.selectedYear = year
        this.displayYear()
        this.displayBuildings()
    }

    selectedBuildingChanged = (buildingId) => {        
        this.selectedBuildingId = buildingId
        this.displayBuildings()
    }

    selectedBishopChanged = (wardId) => {
        this.selectedWardId = wardId
        this.displayBuildings()
    }

    selectedHighCouncilorChanged = (highCouncilorId) => {
        this.selectedHighCouncilId = highCouncilorId
        this.displayBuildings()
    }

    displayYear = () => {
        document.getElementById('year-holder').innerHTML = `${this.selectedYear} &nbsp`
    }

    displayBuildings = async () => {
        if (!service) return

        let buildings = await service.getBuildings()
        if (this.selectedBuildingId > 0) {
            buildings = buildings.filter(building => {
                return building.BuildingId == this.selectedBuildingId
            })
        }

        let parent = document.getElementById('buildings-container')
        parent.innerText = ''

        if ('content' in document.createElement('template')) {
            buildings.forEach(async (building) => {
                const template = document.getElementById('building-row-template').content.cloneNode(true)
                const div = template.querySelector(".building-table")
                const agentBishopLink = template.querySelector(".agent-bishop")

                template.querySelector('.building-name').innerText = building.Name
                template.querySelector('.building-description').innerText = building.Address
                template.querySelector('.map-container').innerHTML = building.MapURL

                const mapToggle = template.querySelector('.clickable')
                const map = template.querySelector('.map-container')

                mapToggle.addEventListener('click', () => {
                    toggle(map)
                })

                const hasWards = await this.displayWards(building.BuildingId, div, agentBishopLink)

                if(hasWards) parent.appendChild(template)
            })
        }
    }

    displayWards = async (buildingId, parent, agentBishopLink) => {
        const highCouncil = await service.getHighCouncil()
        const wards = (await service.getWards())
                            .sort((a,b) => a.TimeSlot - b.TimeSlot)

        const buildingWards = wards.filter(ward => {
            // return immediately on each check if invalid
            if(ward.Year != this.selectedYear) return false
            if(ward.BuildingId != buildingId) return false
            if(ward.Id != this.selectedWardId && this.selectedWardId != 'All') return false
            if(ward.HighCouncilorId != this.selectedHighCouncilId && this.selectedHighCouncilId != 0) return false

            return true
        })

        buildingWards.forEach(ward => {

            const tmpl = document.getElementById('ward-row-template').content.cloneNode(true)
            const hc = highCouncil.find(hc => hc.Id === ward.HighCouncilorId)

            if(ward.IsAgentBishop && agentBishopLink) {
                agentBishopLink.innerText = ward.Bishop
                agentBishopLink.href = ward.BishopProfile
            }

            tmpl.querySelector('.ward-name').innerText = ward.Abbreviation
            tmpl.querySelector('.start-time').innerText = ward.SacramentMeeting
            tmpl.querySelector('#bishop-link').innerText = ward.Bishop
            tmpl.querySelector('#bishop-link').href = ward.BishopProfile
            tmpl.querySelector('#high-councilor-link').innerText = hc.Name
            tmpl.querySelector('#high-councilor-link').href = hc.Profile
            tmpl.querySelector('.youth-night').innerText = ward.YouthNight

            tmpl.querySelector('.cell-ward-name').innerText = ward.Name
            tmpl.querySelector('.cell-start-time').innerText = ward.SacramentMeeting
            tmpl.querySelector('#cell-bishop-link').innerText = ward.Bishop
            tmpl.querySelector('#cell-bishop-link').href = ward.BishopProfile
            tmpl.querySelector('#cell-high-councilor-link').innerText = hc.Name
            tmpl.querySelector('#cell-high-councilor-link').href = hc.Profile
            tmpl.querySelector('.cell-youth-night').innerText = ward.YouthNight

            parent.appendChild(tmpl)
        })

        return buildingWards.length > 0        
    }
}


async function loadBishopsFilter() {
    try {
        let wards = await service.getWards()
        wards = wards.sort((a, b) => a.Id - b.Id)

        const bishopsFilter = document.getElementById('bishop-name')
        if (bishopsFilter) {
            bishopsFilter.addEventListener('input', (e) => {
                filterWardId = +e.target.value
                displayBuildings()
            })

            wards.forEach(ward => {
                const option = document.createElement("option")
                option.value = ward.Id
                option.textContent = `(${ward.Name}) ${ward.Bishop}`
                bishopsFilter.appendChild(option)
            })
        }
    }
    catch (e) {
        console.log(e)
    }

}
