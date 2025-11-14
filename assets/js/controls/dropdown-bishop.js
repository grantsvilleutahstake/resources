let bishopDropdown

document.addEventListener('DOMContentLoaded', async () => {
    bishopDropdown = new BishopDropdown()
})

class BishopDropdown {

    selectedBishopId = 0
    selectionChangedListener = new EventListener(this)

    constructor() {
        this.loadBishops()
    }

    loadBishops = async () => {
        try {
            let wards = await service.getWards();
            wards = wards.sort((a, b) => a.Id - b.Id);

            const bishopsFilter = document.getElementById('bishop-select')
            if (bishopsFilter) {
                bishopsFilter.addEventListener('input', (e) => {
                    this.selectedBishopId = +e.target.value
                    this.selectionChangedListener.raise(this.selectedBishopId)
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

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
