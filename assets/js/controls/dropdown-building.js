class BuildingDropdown {

    selectedBuildingId = 0
    selectionChangedListener = new EventListener(this)

    constructor() {
        this.loadBuildings()
    }

    loadBuildings = async () => {
        try {
            const buildings = await service.getBuildings();

            const dropdown = document.getElementById('building-select')
            if (dropdown) {
                dropdown.addEventListener('input', (e) => {
                    this.selectedBuildingId = +e.target.value;
                    this.selectionChangedListener.raise(this.selectedBuildingId)
                })

                buildings.forEach(building => {
                    const option = document.createElement("option");
                    option.value = building.BuildingId;
                    option.textContent = building.Name;
                    dropdown.appendChild(option);
                })
            }
            
            setFilterFromUrl(dropdown, "building")
            this.selectedMonth = dropdown.value
            
        }
        catch (e) {
            console.log(e);
        }

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
