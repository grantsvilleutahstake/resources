
class MonthDropdown {

    selectedMonth = 0
    selectionChangedListener = new EventListener(this)

    constructor() {

        const dropdown = document.getElementById('month-select')
        if (dropdown) {
            dropdown.addEventListener('input', (e) => {
                this.selectedMonth = +e.target.value
                this.selectionChangedListener.raise(this.selectedMonth)
            })
        }

        setFilterFromUrl(dropdown, "month")
        this.selectedMonth = dropdown.value

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }

    readQueryString = () => {
        
    }
}
