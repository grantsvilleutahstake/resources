
class YearDropdown {

    selectedYear
    loadRows
    selectionChangedListener = new EventListener(this)

    /**
     * @param {Function} [loadRows] - optional async loader returning rows that
     *      carry a Year column. Defaults to the wards list, which is the range
     *      most pages filter over. Pass the page's own data when its sheet
     *      covers different years (see the bishops page).
     */
    constructor(loadRows) {
        this.loadRows = loadRows ?? (() => service.getWards())
        this.loadYears()
    }


    loadYears = async () => {
        try {
            this.selectedYear = getCurrentYear()

            const rows = await this.loadRows()

            let years = rows.map(row => row.Year)
                            .filter(year => year !== null && year !== undefined && year !== '')
                            .map(year => year + '')

            years = [...new Set(years)].sort((a, b) => a - b)

            // The year is remembered across pages, but each sheet covers its own
            // range - so a year chosen elsewhere may have no rows here. Fall back
            // instead of rendering an empty table.
            let clamped = false
            if (years.length && !years.includes(this.selectedYear + '')) {
                const thisYear = new Date().getFullYear() + ''
                this.selectedYear = years.includes(thisYear) ? thisYear : years[years.length - 1]
                clamped = true
            }

            const dropdown = document.getElementById('year-select')
            if (dropdown) {
                dropdown.addEventListener('input', (e) => {
                    this.selectedYear = +e.target.value
                    this.selectionChangedListener.raise(this.selectedYear)
                    setCurrentYear(this.selectedYear)
                })

                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;

                    if(year == this.selectedYear){
                        option.selected = true
                    }

                    dropdown.appendChild(option);
                })
            }

            // the page already rendered against the pre-clamp year, so tell it to redraw
            if (clamped) this.selectionChangedListener.raise(this.selectedYear)
        }
        catch (e) {
            console.log(e);
        }

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
