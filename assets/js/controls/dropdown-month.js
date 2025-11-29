
class MonthDropdown {

    selectedMonth = 0
    selectionChangedListener = new EventListener(this)

    constructor() {

        const monthFilter = document.getElementById('month-select')
        if (monthFilter) {
            monthFilter.addEventListener('input', (e) => {
                this.selectedMonth = +e.target.value
                this.selectionChangedListener.raise(this.selectedMonth)
            })
        }
    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
