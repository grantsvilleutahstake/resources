let wardsFilter

document.addEventListener('DOMContentLoaded', async () => {
    wardsFilter = new WardsFilter()

    // loadBishopsFilter();

})

class WardsFilter {

    selectedWardId = 0
    selectedHighCouncilId = 0
    selectedBuildingId = 0

    constructor() {
        this.displayBuildings()

        buildingDropdown.onSelectionChanged(this.selectedBuildingChanged)
        bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
        highCouncilDropdown.onSelectionChanged(this.selectedHighCouncilorChanged)
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


    displayBuildings = async () => {
        if (!service) return;

        let buildings = await service.getBuildings();
        if (this.selectedBuildingId > 0) {
            buildings = buildings.filter(building => {
                return building.BuildingId == this.selectedBuildingId;
            })
        }

        let parent = document.getElementById('buildings-container');
        parent.innerText = '';

        if ('content' in document.createElement('template')) {
            buildings.forEach(async (building) => {
                const template = document.getElementById('building-row-template').content.cloneNode(true);
                const div = template.querySelector(".building-table");

                template.querySelector('.building-name').innerText = building.Name;
                template.querySelector('.building-description').innerText = building.Address;
                template.querySelector('.map-container').innerHTML = building.MapURL;

                const mapToggle = template.querySelector('.clickable');
                const map = template.querySelector('.map-container');

                mapToggle.addEventListener('click', () => {
                    toggle(map);
                })

                const hasWards = await this.displayWards(building.BuildingId, div);

                if(hasWards) parent.appendChild(template);
            });
        }
    }

    displayWards = async (buildingId, parent) => {
        const highCouncil = await service.getHighCouncil();
        const wards = await service.getWards();

        const buildingWards = wards.filter(ward => {
            const isBuilding = ward.BuildingId == buildingId;
            const hasBishop = ward.Id == this.selectedWardId || this.selectedWardId == 0;
            const hasHighCouncil = ward.HighCouncilorId == this.selectedHighCouncilId || this.selectedHighCouncilId == 0;

            return isBuilding && hasBishop && hasHighCouncil;
        });

        buildingWards.forEach(ward => {

            const tmpl = document.getElementById('ward-row-template').content.cloneNode(true);
            const hc = highCouncil.find(hc => hc.Id === ward.HighCouncilorId);

            tmpl.querySelector('.ward-name').innerText = ward.Abbreviation;
            tmpl.querySelector('.start-time').innerText = ward.SacramentMeeting;
            tmpl.querySelector('#bishop-link').innerText = ward.Bishop;
            tmpl.querySelector('#bishop-link').href = ward.BishopProfile;
            tmpl.querySelector('#high-councilor-link').innerText = hc.Name;
            tmpl.querySelector('#high-councilor-link').href = hc.Profile;
            tmpl.querySelector('.youth-night').innerText = ward.YouthNight;

            parent.appendChild(tmpl);
        })

        return buildingWards.length > 0;        
    }
}


async function loadBishopsFilter() {
    try {
        let wards = await service.getWards();
        wards = wards.sort((a, b) => a.Id - b.Id);

        const bishopsFilter = document.getElementById('bishop-name')
        if (bishopsFilter) {
            bishopsFilter.addEventListener('input', (e) => {
                filterWardId = +e.target.value;
                displayBuildings();
            })

            wards.forEach(ward => {
                const option = document.createElement("option");
                option.value = ward.Id;
                option.textContent = `(${ward.Name}) ${ward.Bishop}`;
                bishopsFilter.appendChild(option);
            })
        }
    }
    catch (e) {
        console.log(e);
    }

}
