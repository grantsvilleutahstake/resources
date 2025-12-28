class HighCouncilDropdown {

    selectedHighCouncilorId = 0
    selectionChangedListener = new EventListener(this)

    constructor() {
        this.loadHighCouncil()
    }

    loadHighCouncil = async () => {
        try {
            let highCouncilors = await service.getHighCouncil();
            highCouncilors = highCouncilors.sort((a, b) => a.Seniority - b.Seniority);

            const dropdown = document.getElementById('high-council-select')
            if (dropdown) {
                dropdown.addEventListener('input', (e) => {
                    this.selectedHighCouncilorId = +e.target.value
                    this.selectionChangedListener.raise(this.selectedHighCouncilorId)
                })

                highCouncilors.forEach(hc => {
                    const option = document.createElement("option");
                    option.value = hc.CallingId;
                    option.textContent = hc.Name;
                    dropdown.appendChild(option);
                })
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
